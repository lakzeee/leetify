type Props = {
  groupName: string;
  onClick: () => void;
  enableProgress: boolean;
  questionCount: number;
  completedQuestionCount: number;
};
export default function GroupRow({
  groupName,
  onClick,
  enableProgress,
  questionCount,
  completedQuestionCount,
}: Props) {
  return (
    <tr
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
      onClick={onClick}
    >
      <td className="px-6 py-2" colSpan={7}>
        <div className="flex flex-row lg:justify-between gap-8">
          <span className="font-bold uppercase whitespace-nowrap">
            {groupName}
          </span>
          {enableProgress && (
            <div className="flex justify-center gap-6 items-center">
              <progress
                className="progress progress-success w-64"
                value={completedQuestionCount}
                max={questionCount}
              />
              <span className="font-bold">
                ({completedQuestionCount}/{questionCount})
              </span>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}
