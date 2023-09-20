import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function TableWrapper({ children }: Props) {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg min-w-full">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        {children}
      </table>
    </div>
  );
}
