import type { DraftEntry } from "./types";

const TAGS = ["FoodExpense", "Hobby", "UtilityBills", "Loan"] as const;
const SELECTED_TAGS = ["All", ...TAGS] as const;

const emptyDraft: DraftEntry = {
    date: "",
    tag: "FoodExpense",
    description: "",
    amount: "",
    note: "",
};

export { TAGS, SELECTED_TAGS, emptyDraft };
