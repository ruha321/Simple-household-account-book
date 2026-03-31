import { useReducer } from "react";
import "./App.css";
import { initialState, reducer } from "./reducer/reducer";
import { filterByTag, sumAmount } from "./derived-data/derivedData";
import { errorMessage } from "./reducer/validation";

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const visibleEntries = filterByTag(state.entries, state.selectedTag);
    const filteredTotalAmount = sumAmount(visibleEntries);

    return (
        <>
            <pre>{JSON.stringify(state, null, 2)}</pre>
            {state.submitAttemoted && state.errors.length > 0 && (
                <ul>
                    {state.errors.map((error) => (
                        <li key={error}>{errorMessage(error)}</li>
                    ))}
                </ul>
            )}
            <input
                placeholder="Date"
                value={state.draft.date}
                onChange={(e) =>
                    dispatch({
                        type: "DraftDateChanged",
                        value: e.target.value,
                    })
                }
            />
            <input
                placeholder="Description"
                value={state.draft.description}
                onChange={(e) =>
                    dispatch({
                        type: "DraftDescriptionChanged",
                        value: e.target.value,
                    })
                }
            />

            <input
                placeholder="Amount"
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
