type Props = {
  groupName: string;
};
export default function GroupRow({ groupName }: Props) {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="px-6 py-2" colSpan={7}>
        <div className="flex flex-row lg:justify-between gap-8">
          <span className="font-bold uppercase whitespace-nowrap">
            {groupName}
          </span>
        </div>
      </td>
    </tr>
  );
}
