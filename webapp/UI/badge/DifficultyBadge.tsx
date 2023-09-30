type Props = {
  name: string;
};
export default function DifficultyBadge({ name }: Props) {
  let badgeColor =
    "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300";
  if (name === "Easy")
    badgeColor =
      "bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-300";
  else if (name === "Medium")
    badgeColor =
      "bg-yellow-100 text-yellow-600 dark:bg-yellow-800 dark:text-yellow-300";
  else if (name === "Hard")
    badgeColor = "bg-red-100 text-red-600 dark:bg-red-800 dark:text-red-300";

  return (
    <div
      className={`badge ${badgeColor} flex justify-center item-center border-none`}
    >
      {name}
    </div>
  );
}
