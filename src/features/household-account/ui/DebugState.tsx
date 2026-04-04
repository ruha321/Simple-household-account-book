import type { AppState } from "../model/types";

type DebugStateProps = {
    state: AppState;
};

const DebugState = (props: DebugStateProps) => {
    const { state } = props;
    return (
        <details>
            <summary>state確認</summary>
            <pre>{JSON.stringify(state, null, 2)}</pre>
        </details>
    );
};

export default DebugState;
