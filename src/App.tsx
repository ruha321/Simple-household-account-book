import { useEffect, useReducer } from "react";
import "./App.css";
import {
    createInitialState,
    savePersistedState,
} from "./features/household-account/model/persistence";
import { reducer } from "./features/household-account/model/reducer";
import {
    selectFilteredTotalAmount,
    selectVisibleEntries,
    sumAmount,
} from "./features/household-account/model/selectors";
import EntryForm from "./features/household-account/ui/EntryForm";
import type {
    SelectedTag,
    Tag,
} from "./features/household-account/model/types";
import TagFilter from "./features/household-account/ui/TagFilter";
import SummaryPanel from "./features/household-account/ui/SummaryPanel";
import EntryList from "./features/household-account/ui/EntryList";
import DebugState from "./features/household-account/ui/DebugState";

function App() {
    const [state, dispatch] = useReducer(reducer, createInitialState());

    const visibleEntries = selectVisibleEntries(state);
    const totalAmount = sumAmount(state.entries);
    const filteredTotalAmount = selectFilteredTotalAmount(state);

    const { entries, selectedTag } = state;
    useEffect(() => {
        savePersistedState({
            entries,
            selectedTag,
        });
    }, [entries, selectedTag]);

    return (
        <div>
            <h1>簡易家計簿</h1>

            <EntryForm
                draft={state.draft}
                errors={state.errors}
                submitAttempted={false}
                onDateChange={(value: string) =>
                    dispatch({
                        type: "DraftDateChanged",
                        value,
                    })
                }
                onTagChange={(value: Tag) =>
                    dispatch({
                        type: "DraftTagChanged",
                        value,
                    })
                }
                onDescriptionChange={(value: string) =>
                    dispatch({
                        type: "DraftDescriptionChanged",
                        value,
                    })
                }
                onAmountChange={(value: string) =>
                    dispatch({
                        type: "DraftAmountChanged",
                        value,
                    })
                }
                onNoteChange={(value: string) =>
                    dispatch({
                        type: "DraftNoteChanged",
                        value,
                    })
                }
                onSubmit={() => {
                    dispatch({
                        type: "EntrySubmitted",
                        id: crypto.randomUUID(),
                    });
                }}
            />

            <TagFilter
                selectedTag={state.selectedTag}
                onSelectedTagChange={(value: SelectedTag) => {
                    dispatch({
                        type: "SelectedTagChanged",
                        value,
                    });
                }}
            />

            <SummaryPanel
                totalAmount={totalAmount}
                filteredTotalAmount={filteredTotalAmount}
                visibleCount={visibleEntries.length}
            />

            <EntryList entries={visibleEntries} />

            <DebugState state={state} />
        </div>
    );
}

export default App;
