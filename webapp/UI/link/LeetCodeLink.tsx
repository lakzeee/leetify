import React from "react";

type Props = {
  children: React.ReactNode;
  title: string;
};
export default function LeetCodeLink({ children, title }: Props) {
  function slug(title: string) {
    return title.replace(/\s+/g, "-");
  }
  return (
    <a
      href={`https://www.leetcode.com/problems/${slug(title)}`}
      target="_blank"
    >
      {children}
    </a>
  );
}
