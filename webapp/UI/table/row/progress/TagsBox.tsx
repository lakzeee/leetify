import { useState } from "react";
import TagsInput from "@/UI/table/row/progress/TagsInput";
import TopicBadges from "@/UI/table/TopicBadges";

export default function TagsBox() {
  const [values, setValues] = useState("default");
  const [editMode, setEditMode] = useState(false);

  function handleTagChange(value: string) {
    setValues(value);
  }

  return (
    <div>
      {!editMode && (
        <span onClick={() => setEditMode(!editMode)}>
          <TopicBadges topics={values} color={"badge-neutral"} />
        </span>
      )}
      {editMode && (
        <TagsInput
          value={values}
          onChange={handleTagChange}
          setEditMode={() => setEditMode(false)}
        />
      )}
    </div>
  );
}
