import TableWrapper from "@/UI/table/tablebase/TableWrapper";
import TableHeader from "@/UI/table/tablebase/TableHeader";
import React from "react";

export default function Table() {
  const columTitles = [
    "Title",
    "Topics",
    "Difficulties",
    "LastStatus",
    "LastVisit",
  ];
  return (
    <TableWrapper>
      <TableHeader columTitles={columTitles} />
    </TableWrapper>
  );
}
