const TAGS = ["FoodExpense", "Hobby", "UtilityBills", "Loan"] as const;
type Tag = (typeof TAGS)[number];

const SELECTED_TAGS = ["All", ...TAGS] as const;
type SelectedTag = (typeof SELECTED_TAGS)[number];

function isTag(value: string): value is Tag {
    return TAGS.includes(value as Tag);
}

function isSelectedTag(value: string): value is SelectedTag {
    return SELECTED_TAGS.includes(value as SelectedTag);
}

type DraftEntry = Readonly<{
    date: string;
    tag: Tag;
    description: string;
    amount: string;
    note: string;
}>;

type ExpenseEntry = Readonly<{
    id: string;
    date: string;
    tag: Tag;
    description: string;
    amount: number;
    note: string;
}>;

type PersistedState = Readonly<{
    entries: readonly ExpenseEntry[];
    selectedTag: SelectedTag;
}>;

type ValidationError =
    | "DateRequired"
    | "DescriptionRequired"
    | "AmountRequired"
    | "AmountInvalid";

type ValidationResult = Readonly<{
    ok: boolean;
    errors: readonly ValidationError[];
}>;

type AppState = Readonly<{
    entries: readonly ExpenseEntry[];
    draft: DraftEntry;
    selectedTag: SelectedTag;
    errors: readonly ValidationError[];
    submitAttempted: boolean;
}>;

type Action =
    | Readonly<{ type: "DraftDateChanged"; value: string }>
    | Readonly<{ type: "DraftTagChanged"; value: Tag }>
    | Readonly<{ type: "DraftDescriptionChanged"; value: string }>
    | Readonly<{ type: "DraftAmountChanged"; value: string }>
    | Readonly<{ type: "DraftNoteChanged"; value: string }>
    | Readonly<{ type: "EntrySubmitted"; id: string }>
    | Readonly<{ type: "SelectedTagChanged"; value: SelectedTag }>;

export type {
    Tag,
    SelectedTag,
    DraftEntry,
    ExpenseEntry,
    PersistedState,
    AppState,
    Action,
    ValidationError,
    ValidationResult,
};

export { TAGS, SELECTED_TAGS, isTag, isSelectedTag };
