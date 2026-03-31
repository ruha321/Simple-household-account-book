import { useReducer } from "react";
import "./App.css";
import { initialState, reducer } from "./reducer/reducer";
import { filterByTag, sumAmount } from "./derived-data/derivedData";

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const visibleEntries = filterByTag(state.entries, state.selectedTag);
    const totalAmount = sumAmount(state.entries);
    const filteredTotalAmount = sumAmount(visibleEntries);
    return (
        <>
            <input
                value={state.draft.description}
                onChange={(e) =>
                    dispatch({
                        type: "DraftDescriptionChanged",
                        value: e.target.value,
                    })
                }
            />

            <input
                value={state.draft.amount}
                onChange={(e) =>
                    dispatch({
                        type: "DraftAmountChanged",
                        value: e.target.value,
                    })
                }
            />
            <button
                onClick={() =>
                    dispatch({ type: "EntrySubmitted", id: "temp-id-1" })
                }
            >
                支出を追加
            </button>

            <div>全体合計: {filteredTotalAmount}</div>
        </>
    );
}

export default App;
