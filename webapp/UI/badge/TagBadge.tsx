type Props = {
  name: string;
};
export default function TagBadge({ name }: Props) {
  return (
    <div className={`badge border-none bg-gray-100 dark:bg-base-100 mr-1 mb-1`}>
      {name}
    </div>
  );
}
