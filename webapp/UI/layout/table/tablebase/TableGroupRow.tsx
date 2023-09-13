type Props = {
  groupName: string;
};
export default function TableGroupRow({ groupName }: Props) {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="px-6 py-4" colSpan={5}>
        <span className="font-bold uppercase">{groupName}</span>
      </td>
    </tr>
  );
}
