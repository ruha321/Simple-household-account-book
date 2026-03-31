import type {
    Action,
    AppState,
    DraftEntry,
} from "../types/Date-types";
import submitDraft from "./submitDraft";
import { validateDraft } from "./validation";

const emptyDraft: DraftEntry = {
    date: "",
    tag: "FoodExpense",
    description: "",
    amount: "",
    note: "",
};

const initialState: AppState = {
    entries: [],
    draft: emptyDraft,
    selectedTag: "All",
    errors: [],
    submitAttemoted: false,
};

function updateDraft(state: AppState, nextDraft: DraftEntry): AppState {
    return {
        ...state,
        draft: nextDraft,
        errors: state.submitAttemoted ? validateDraft(nextDraft) : state.errors,
    };
}

function reducer(state: AppState, action: Action): AppState {
    switch (action.type) {
        case "DraftDateChanged":
            return updateDraft(state, {
                ...state.draft,
                date: action.value,
            });
        case "DraftTagChanged":
            return updateDraft(state, {
                ...state.draft,
                tag: action.value,
            });
        case "DraftDescriptionChanged":
            return updateDraft(state, {
                ...state.draft,
                description: action.value,
            });
        case "DraftAmountChanged":
            return updateDraft(state, {
                ...state.draft,
                amount: action.value,
            });
        case "DraftNoteChanged":
            return updateDraft(state, {
                ...state.draft,
                note: action.value,
            });
        case "SelectedTagChanged":
            return {
                ...state,
                selectedTag: action.value,
            };
        case "EntrySubmitted": {
            const result = submitDraft(action.id, state.draft)

            if (!result.ok) {
                return {
                    ...state,
                    submitAttemoted: true,
                    errors: result.errors,
                };
            }

            return {
                ...state,
                entries: [...state.entries, result.entry],
                draft: emptyDraft,
                errors: [],
                submitAttemoted: false,
            };
        }
    }
}

export { emptyDraft, initialState, reducer };
