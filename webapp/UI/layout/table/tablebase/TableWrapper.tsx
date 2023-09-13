import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function TableWrapper({ children }: Props) {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="w-full text-left">{children}</table>
    </div>
  );
}
