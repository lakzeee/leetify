import DifficultyFilter from "@/UI/layout/table/filter/DifficultyFilter";
import TopicsFilter from "@/UI/layout/table/filter/TopicsFilter";

export default function Filters() {
  return (
    <div className="flex flex-row gap-1 mb-3">
      <DifficultyFilter />
      <TopicsFilter />
    </div>
  );
}
