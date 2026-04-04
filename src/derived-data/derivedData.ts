import type { AppState, ExpenseEntry } from "../types/types";

function selectVisibleEntries(state: AppState): readonly ExpenseEntry[] {
    if (state.selectedTag === "All") {
        return state.entries;
    }
    return state.entries.filter((entry) => entry.tag === state.selectedTag);
}

function sumAmount(entries: readonly ExpenseEntry[]): number {
    return entries.reduce((sum, entry) => sum + entry.amount, 0);
}

function selectFilteredTotalAmount(state: AppState): number {
    return sumAmount(selectVisibleEntries(state));
}

export { selectVisibleEntries, sumAmount, selectFilteredTotalAmount };
