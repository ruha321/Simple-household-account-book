import { initialState } from "./reducer";
import type { AppState, ExpenseEntry, SelectedTag } from "./types";

type PersistedState = Readonly<{
    entries: readonly ExpenseEntry[];
    selectedTag: SelectedTag;
}>;

const STORAGE_KEY = "simple-household-account-book";

function loadPersistedState(): PersistedState | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return null;

    try {
        return JSON.parse(raw) as PersistedState;
    } catch {
        return null;
    }
}

function createInitialState(): AppState {
    const persisted = loadPersistedState();

    if (persisted === null) {
        return initialState;
    }

    return {
        ...initialState,
        entries: persisted.entries,
        selectedTag: persisted.selectedTag,
    };
}

export type { PersistedState };
export { STORAGE_KEY, loadPersistedState, createInitialState };
