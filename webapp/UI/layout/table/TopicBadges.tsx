import { useMediaQuery } from "usehooks-ts";

type Props = {
  topics: string;
  maxBadge?: number;
};

function truncateString(strs: string[], maxLength: number) {
  let res = [];
  for (let str of strs) {
    if (str.length <= maxLength) {
      res.push(str);
    } else {
      res.push(str.slice(0, maxLength) + "...");
    }
  }
  return res;
}

export default function TopicBadges({ topics, maxBadge = 3 }: Props) {
  const isSmallScreen = useMediaQuery("(max-width: 800px)"); // Small screen width limit
  const isMediumScreen = useMediaQuery("(max-width: 1020px)"); // Medium screen width lim

  let listOfTopic = topics.split(",").slice(0, maxBadge);

  if (isSmallScreen) {
    listOfTopic = truncateString(listOfTopic, 6); // Shorten more for small screens
  } else if (isMediumScreen) {
    listOfTopic = truncateString(listOfTopic, 10);
  }

  return (
    <>
      {listOfTopic.map((t, index) => (
        <div key={index} className="badge badge-info ml-1">
          {t}
        </div>
      ))}
    </>
  );
}
