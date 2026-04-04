import type { DraftEntry, ExpenseEntry, ValidationError } from "../types/types";
import { parseAmount, validateDraft } from "./validation";

function createEntry(
    id: string,
    draft: DraftEntry,
    amount: number,
): ExpenseEntry {
    return {
        id,
        date: draft.date,
        tag: draft.tag,
        description: draft.description,
        amount,
        note: draft.note,
    };
}

type SubmitDraftResult =
    | Readonly<{ ok: false; errors: readonly ValidationError[] }>
    | Readonly<{ ok: true; entry: ExpenseEntry }>;

function submitDraft(id: string, draft: DraftEntry): SubmitDraftResult {
    const errors = validateDraft(draft);

    if (errors.length > 0) {
        return { ok: false, errors };
    }

    const parsed = parseAmount(draft.amount);

    if (!parsed.ok) {
        return { ok: false, errors: ["AmountInvalid"] };
    }

    return {
        ok: true,
        entry: createEntry(id, draft, parsed.value),
    };
}

export default submitDraft;
