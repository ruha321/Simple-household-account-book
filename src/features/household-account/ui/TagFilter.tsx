import { SELECTED_TAGS } from "../model/constants";
import { isSelectedTag } from "../model/guards";
import type { SelectedTag } from "../model/types";
import { selectedTagLabelMap } from "./labels";

type TagFilterProps = {
    selectedTag: SelectedTag;
    onSelectedTagChange: (value: SelectedTag) => void;
};

const TagFilter = (props: TagFilterProps) => {
    const { selectedTag, onSelectedTagChange } = props;
    return (
        <section>
            <h2>絞り込み</h2>

            <select
                value={selectedTag}
                onChange={(e) => {
                    const value = e.target.value;
                    if (isSelectedTag(value)) onSelectedTagChange(value);
                }}
            >
                {SELECTED_TAGS.map((selected_tag) => (
                    <option key={selected_tag} value={selected_tag}>
                        {selectedTagLabelMap[selected_tag]}
                    </option>
                ))}
            </select>
        </section>
    );
};

export default TagFilter;
