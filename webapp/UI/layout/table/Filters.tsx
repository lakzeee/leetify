import DifficultyFilter from "@/UI/layout/table/filter/DifficultyFilter";
import TopicFilter from "@/UI/layout/table/filter/TopicFilter";

export default function Filters() {
  return (
    <div className="flex flex-row gap-1 mb-3">
      <DifficultyFilter />
      <TopicFilter />
    </div>
  );
}
