import type { ExpenseEntry, SelectedTag } from "../types/Date-types";

function filterByTag(
    entries: readonly ExpenseEntry[],
    selectedTag: SelectedTag,
): readonly ExpenseEntry[] {
    if (selectedTag === "All") return entries;
    return entries.filter((entry) => entry.tag === selectedTag);
}

function sumAmount(entries: readonly ExpenseEntry[]): number {
    return entries.reduce((sum, entry) => sum + entry.amount, 0);
}

export { filterByTag, sumAmount };
