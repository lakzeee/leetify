import React, { useEffect, useState } from "react";
import { useQuestionsSearchParamsStore } from "@/Components/hooks/useQuestionsSearchParamsStore";
import { getAllTopics } from "@/Components/actions/questionActions";

const TopicFilter: React.FC = () => {
  const topic = useQuestionsSearchParamsStore((state) => state.filterBy);
  const setParams = useQuestionsSearchParamsStore((state) => state.setParams);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getAllTopics()
      .then((res) => {
        // @ts-ignore
        setTopics(res);
      })
      .catch((err) => {});
  }, []);
  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTopic = e.target.value;
    setParams({ filterBy: newTopic });
  };

  return (
    <select
      id="topic"
      name="topic"
      className="select max-w-xs focus:border-none focus:ring-0"
      value={topic || ""}
      onChange={handleTopicChange}
    >
      <option value={""}>Select A Topic</option>
      {topics.length > 0 &&
        topics.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
    </select>
  );
};

export default TopicFilter;
