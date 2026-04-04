import type { DraftEntry, ValidationError } from "./types";

function validateDraft(draft: DraftEntry): readonly ValidationError[] {
    const errors: ValidationError[] = [];

    if (draft.date.trim() === "") {
        errors.push("DateRequired");
    }

    if (draft.description.trim() === "") {
        errors.push("DescriptionRequired");
    }

    if (draft.amount.trim() === "") {
        errors.push("AmountRequired");
    } else if (!parseAmount(draft.amount).ok) {
        errors.push("AmountInvalid");
    }

    return errors;
}

type ParseAmountResult =
    | Readonly<{ ok: true; value: number }>
    | Readonly<{ ok: false; error: "AmountInvalid" }>;

function parseAmount(input: string): ParseAmountResult {
    const trimmed = input.trim();

    if (trimmed === "") {
        return { ok: false, error: "AmountInvalid" };
    }

    const value = Number(trimmed);

    if (Number.isNaN(value)) {
        return { ok: false, error: "AmountInvalid" };
    }

    return { ok: true, value };
}

export { validateDraft, parseAmount };
