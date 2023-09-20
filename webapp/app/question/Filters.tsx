import DifficultyFilter from "@/UI/table/filter/DifficultyFilter";
import TopicsFilter from "@/UI/table/filter/TopicsFilter";

export default function Filters() {
  return (
    <div className="flex flex-col md:flex-row gap-1 mb-3">
      <DifficultyFilter />
      <TopicsFilter />
    </div>
  );
}
