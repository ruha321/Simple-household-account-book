import { TAGS } from "../model/constants";
import { isTag } from "../model/guards";
import type { DraftEntry, Tag, ValidationError } from "../model/types";
import { tagLabelMap, errorMessage } from "./labels";

type EntryFormProps = {
    draft: DraftEntry;
    errors: readonly ValidationError[];
    submitAttempted: boolean;
    onDateChange: (value: string) => void;
    onTagChange: (value: Tag) => void;
    onDescriptionChange: (value: string) => void;
    onAmountChange: (value: string) => void;
    onNoteChange: (value: string) => void;
    onSubmit: () => void;
};

const EntryForm = (props: EntryFormProps) => {
    const {
        draft,
        errors,
        submitAttempted,
        onDateChange,
        onDescriptionChange,
        onAmountChange,
        onTagChange,
        onNoteChange,
        onSubmit,
    } = props;
    return (
        <section>
            <h2>入力</h2>

            <input
                type="date"
                value={draft.date}
                // TODO:修正
                onChange={(e) => onDateChange(e.target.value)}
            />
            <select
                value={draft.tag}
                onChange={(e) => {
                    const value = e.target.value;
                    if (isTag(value)) {
                        onTagChange(value);
                    }
                }}
            >
                {TAGS.map((tag) => (
                    <option key={tag} value={tag}>
                        {tagLabelMap[tag]}
                    </option>
                ))}
            </select>
            <input
                type="text"
                placeholder="内容"
                value={draft.description}
                onChange={(e) => onDescriptionChange(e.target.value)}
            />

            <input
                type="text"
                placeholder="金額"
                value={draft.amount}
                onChange={(e) => onAmountChange(e.target.value)}
            />
            <input
                type="text"
                placeholder="備考"
                value={draft.note}
                onChange={(e) => {
                    onNoteChange(e.target.value);
                }}
            />
            <button onClick={() => onSubmit()}>支出を追加</button>

            {submitAttempted && errors.length > 0 && (
                <ul>
                    {errors.map((error) => (
                        <li key={error}>{errorMessage(error)}</li>
                    ))}
                </ul>
            )}
        </section>
    );
};

export default EntryForm;
