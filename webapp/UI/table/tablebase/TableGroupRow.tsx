type Props = {
  groupName: string;
  onClick?: () => void;
};
export default function TableGroupRow({ groupName, onClick }: Props) {
  return (
    <tr
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
      onClick={onClick}
    >
      <td className="px-6 py-2" colSpan={7}>
        <span className="font-bold uppercase whitespace-nowrap">
          {groupName}
        </span>
      </td>
    </tr>
  );
}
