import type { DraftEntry, ValidationError } from "../types/Date-types";

function validateDraft(draft: DraftEntry): readonly ValidationError[] {
    const errors: ValidationError[] = [];

    if (draft.date.trim() === "") {
        errors.push("DateRequired");
    }

    if (draft.description.trim() === "") {
        errors.push("DescriptionRequired");
    }

    if (draft.amount.trim() === "") {
        errors.push("AmountRequired");
    } else if (Number.isNaN(Number(draft.amount))) {
        errors.push("AmountInvalid");
    }

    return errors;
}

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

export { validateDraft, errorMessage };
