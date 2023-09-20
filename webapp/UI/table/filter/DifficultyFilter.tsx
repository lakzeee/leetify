import React from "react";
import { useQuestionsSearchParamsStore } from "@/Components/hooks/useQuestionsSearchParamsStore";

const DifficultyFilter: React.FC = () => {
  const difficulty = useQuestionsSearchParamsStore((state) => state.difficulty);
  const setParams = useQuestionsSearchParamsStore((state) => state.setParams);

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDifficulty = e.target.value;
    setParams({ difficulty: newDifficulty });
  };

  return (
    <select
      id="difficulty"
      name="difficulty"
      value={difficulty || ""}
      className="select selete-sm max-w-xs focus:border-none focus:ring-0"
      onChange={handleDifficultyChange}
    >
      <option value={""}>Select A Difficulty</option>
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </select>
  );
};

export default DifficultyFilter;
