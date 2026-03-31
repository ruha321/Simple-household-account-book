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
    id: number;
    date: string;
    tag: Tag;
    description: string;
    amount: number;
    note: string;
}>;

type AppState = Readonly<{
    entries: readonly ExpenseEntry[];
    draft: DraftEntry;
    selectedTag: SelectedTag;
}>;

type Action =
    | Readonly<{ types: "DraftDateChanged"; value: string }>
    | Readonly<{ types: "DraftTagChanged"; value: Tag }>
    | Readonly<{ types: "DraftDescriptionChanged"; value: string }>
    | Readonly<{ types: "DraftAmountChanged"; value: string }>
    | Readonly<{ types: "DraftNoteChanged"; value: string }>
    | Readonly<{ types: "EntrySubmitted"; id: string }>
    | Readonly<{ types: "SelectedTagChanged"; value: SelectedTag }>;

export type { Tag, SelectedTag, DraftEntry, ExpenseEntry, AppState, Action };
