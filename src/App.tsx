import { useEffect, useReducer } from "react";
import "./App.css";
import { createInitialState } from "./features/household-account/model/persistence";
import { reducer } from "./features/household-account/model/reducer";
import {
    selectFilteredTotalAmount,
    selectVisibleEntries,
    sumAmount,
} from "./features/household-account/model/selectors";
import type { PersistedState } from "./features/household-account/model/persistence";
import {
    errorMessage,
    selectedTagLabelMap,
    tagLabelMap,
} from "./features/household-account/ui/labels";
import { isSelectedTag, isTag } from "./features/household-account/model/types";
import { STORAGE_KEY } from "./features/household-account/model/persistence";
import {
    TAGS,
    SELECTED_TAGS,
} from "./features/household-account/model/constants";

function App() {
    const [state, dispatch] = useReducer(reducer, createInitialState());

    const visibleEntries = selectVisibleEntries(state);
    const totalAmount = sumAmount(state.entries);
    const filteredTotalAmount = selectFilteredTotalAmount(state);

    const { entries, selectedTag } = state;
    useEffect(() => {
        const persisted: PersistedState = {
            entries,
            selectedTag,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
    }, [entries, selectedTag]);

    return (
        <div>
            <h1>簡易家計簿</h1>
            <section>
                <h2>入力</h2>

                <input
                    type="date"
                    value={state.draft.date}
                    onChange={(e) =>
                        dispatch({
                            type: "DraftDateChanged",
                            value: e.target.value,
                        })
                    }
                />
                <select
                    value={state.draft.tag}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (isTag(value))
                            dispatch({
                                type: "DraftTagChanged",
                                value,
                            });
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
                    value={state.draft.description}
                    onChange={(e) =>
                        dispatch({
                            type: "DraftDescriptionChanged",
                            value: e.target.value,
                        })
                    }
                />

                <input
                    type="text"
                    placeholder="金額"
                    value={state.draft.amount}
                    onChange={(e) =>
                        dispatch({
                            type: "DraftAmountChanged",
                            value: e.target.value,
                        })
                    }
                />
                <input
                    type="text"
                    placeholder="備考"
                    value={state.draft.note}
                    onChange={(e) => {
                        dispatch({
                            type: "DraftNoteChanged",
                            value: e.target.value,
                        });
                    }}
                />
                <button
                    onClick={() =>
                        dispatch({
                            type: "EntrySubmitted",
                            id: crypto.randomUUID(),
                        })
                    }
                >
                    支出を追加
                </button>

                {state.submitAttempted && state.errors.length > 0 && (
                    <ul>
                        {state.errors.map((error) => (
                            <li key={error}>{errorMessage(error)}</li>
                        ))}
                    </ul>
                )}
            </section>

            <section>
                <h2>絞り込み</h2>

                <select
                    value={state.selectedTag}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (isSelectedTag(value))
                            dispatch({
                                type: "SelectedTagChanged",
                                value,
                            });
                    }}
                >
                    {SELECTED_TAGS.map((selected_tag) => (
                        <option key={selected_tag} value={selected_tag}>
                            {selectedTagLabelMap[selected_tag]}
                        </option>
                    ))}
                </select>
            </section>

            <section>
                <h2>集計</h2>
                <p>全体合計: {totalAmount.toLocaleString("ja-JP")}円</p>
                <p>
                    表示中合計: {filteredTotalAmount.toLocaleString("ja-JP")}円
                </p>
                <p>件数: {visibleEntries.length}件</p>
            </section>
            <section>
                <h2>一覧</h2>

                {visibleEntries.length === 0 ? (
                    <p>まだデータがないよ</p>
                ) : (
                    <ul>
                        {visibleEntries.map((entry) => (
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

            <details>
                <summary>state確認</summary>
                <pre>{JSON.stringify(state, null, 2)}</pre>
            </details>
        </div>
    );
}

export default App;
