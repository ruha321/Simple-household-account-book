import type {
    Action,
    AppState,
    DraftEntry,
    ExpenseEntry,
} from "../types/Date-types";
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
            const errors = validateDraft(state.draft);

            if (errors.length > 0) {
                return {
                    ...state,
                    submitAttemoted: true,
                    errors,
                };
            }

            const newEntry: ExpenseEntry = {
                id: action.id,
                date: state.draft.date,
                tag: state.draft.tag,
                description: state.draft.description,
                amount: Number(state.draft.amount),
                note: state.draft.note,
            };

            return {
                ...state,
                entries: [...state.entries, newEntry],
                draft: emptyDraft,
                errors: [],
                submitAttemoted: false,
            };
        }
    }
}

export { emptyDraft, initialState, reducer };
