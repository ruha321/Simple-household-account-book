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
    } else if (!parseAmount(draft.amount).ok) {
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

type ParseAmountResult =
    | Readonly<{ ok: true; value: number }>
    | Readonly<{ ok: false; error: "AmountInvalid" }>;

function parseAmount(input: string): ParseAmountResult {
    const trimmed = input.trim();

    if (trimmed === "") {
        return { ok: false, error: "AmountInvalid" };
    }

    const value = Number(trimmed);

    if (Number.isNaN(value)) {
        return { ok: false, error: "AmountInvalid" };
    }

    return { ok: true, value };
}

export { validateDraft, errorMessage, parseAmount };
