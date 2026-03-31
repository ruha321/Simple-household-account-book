import type {
    Action,
    AppState,
    DraftEntry,
    ExpenseEntry,
} from "../types/Date-types";

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
};

function reducer(state: AppState, action: Action): AppState {
    switch (action.type) {
        case "DraftDateChanged":
            return {
                ...state,
                draft: { ...state.draft, date: action.value },
            };
        case "DraftTagChanged":
            return {
                ...state,
                draft: { ...state.draft, tag: action.value },
            };
        case "DraftDescriptionChanged":
            return {
                ...state,
                draft: { ...state.draft, description: action.value },
            };
        case "DraftAmountChanged":
            return {
                ...state,
                draft: { ...state.draft, amount: action.value },
            };
        case "DraftNoteChanged":
            return {
                ...state,
                draft: { ...state.draft, note: action.value },
            };
        case "SelectedTagChanged":
            return {
                ...state,
                selectedTag: action.value,
            };
        case "EntrySubmitted": {
            const amount = Number(state.draft.amount);

            if (
                state.draft.date === "" ||
                state.draft.description === "" ||
                state.draft.amount === "" ||
                Number.isNaN(amount)
            ) {
                return state;
            }

            const newEntry: ExpenseEntry = {
                id: action.id,
                date: state.draft.date,
                tag: state.draft.tag,
                description: state.draft.description,
                amount,
                note: state.draft.note,
            };

            return {
                ...state,
                entries: [...state.entries, newEntry],
                draft: emptyDraft,
            };
        }
    }
}

export { emptyDraft, initialState, reducer };
