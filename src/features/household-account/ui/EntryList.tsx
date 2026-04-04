import type { ExpenseEntry } from "../model/types";
import { tagLabelMap } from "./labels";

type EntryListProps = {
    entries: readonly ExpenseEntry[];
};

const EntryList = (props: EntryListProps) => {
    const { entries } = props;
    return (
        <section>
            <h2>一覧</h2>

            {entries.length === 0 ? (
                <p>まだデータがないよ</p>
            ) : (
                <ul>
                    {entries.map((entry) => (
                        <li key={entry.id}>
                            {entry.date} / {tagLabelMap[entry.tag]} /{" "}
                            {entry.description} /{" "}
                            {entry.amount.toLocaleString("ja-JP")}円
                            {entry.note ? ` / ${entry.note}` : ""}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};

export default EntryList;
