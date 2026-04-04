import { TAGS, SELECTED_TAGS } from "./constants";
import type { Tag, SelectedTag } from "./types";

function isTag(value: string): value is Tag {
    return TAGS.includes(value as Tag);
}

function isSelectedTag(value: string): value is SelectedTag {
    return SELECTED_TAGS.includes(value as SelectedTag);
}

export { isTag, isSelectedTag };
