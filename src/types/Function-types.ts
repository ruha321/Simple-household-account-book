import type { DraftEntry, ExpenseEntry, SelectedTag } from "./Date-types";

type ValidationError =
    | "DateRequired"
    | "DescriptionRequired"
    | "AmountRequired"
    | "AmountInvalid";

type ValidationResult = Readonly<{
    ok: boolean;
    errors: readonly ValidationError[];
}>;

declare function validateDraft(draft: DraftEntry): ValidationResult;

declare function createEntry(draft: DraftEntry): ExpenseEntry;

declare function addEntry(
    entries: readonly ExpenseEntry[],
    entry: ExpenseEntry,
): readonly ExpenseEntry[];

declare function filterByTag(
    entries: readonly ExpenseEntry[],
    selectedTag: SelectedTag,
): readonly ExpenseEntry[];

declare function sumAmount(entries: readonly ExpenseEntry[]): number;

export type { ValidationError, ValidationResult };
export { validateDraft, createEntry, addEntry, filterByTag, sumAmount };
