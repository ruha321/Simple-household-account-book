import type { Tag, SelectedTag, ValidationError } from "../model/types";

const tagLabelMap = Object.freeze({
    FoodExpense: "食費",
    Hobby: "趣味",
    UtilityBills: "公共料金",
    Loan: "返済",
} satisfies Record<Tag, string>);

const selectedTagLabelMap = Object.freeze({
    All: "すべて",
    ...tagLabelMap,
} satisfies Record<SelectedTag, string>);

function errorMessage(error: ValidationError): string {
    switch (error) {
        case "DateRequired":
            return "日付を入力してね";
        case "DescriptionRequired":
            return "摘要を入力してね";
        case "AmountRequired":
            return "金額を入力してね";
        case "AmountInvalid":
            return "金額を数値で入力してね";
    }
}

export { tagLabelMap, selectedTagLabelMap, errorMessage };
