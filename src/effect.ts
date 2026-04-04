import type { PersistedState } from "./types/types";

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

export { STORAGE_KEY, loadPersistedState };
