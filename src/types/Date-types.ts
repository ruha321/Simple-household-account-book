type Tag = "FoodExpense" | "Hobby" | "UtilityBills" | "Loan";

type SelectedTag = "All" | Tag;

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
    submitAttemoted: boolean;
}>;

type Action =
    | Readonly<{ type: "DraftDateChanged"; value: string }>
    | Readonly<{ type: "DraftTagChanged"; value: Tag }>
    | Readonly<{ type: "DraftDescriptionChanged"; value: string }>
    | Readonly<{ type: "DraftAmountChanged"; value: string }>
    | Readonly<{ type: "DraftNoteChanged"; value: string }>
    | Readonly<{ type: "EntrySubmitted"; id: string }>
    | Readonly<{ type: "SelectedTagChanged"; value: SelectedTag }>;

export type { Tag, SelectedTag, DraftEntry, ExpenseEntry, AppState, Action, ValidationError, ValidationResult };
