import React from "react";

type TextTruncateProps<T extends React.ElementType = "span"> = {
  as?: T;
  text: string;
  maxChars?: number;
  suffix?: string;
  className?: string;
} & React.ComponentPropsWithoutRef<T>;

export default function TextTruncate<T extends React.ElementType = "span">({
  as,
  text,
  maxChars = 100,
  suffix = "...",
  className,
  ...rest
}: TextTruncateProps<T>) {
  const Tag = as || "span";
  const shouldTruncate = text.length > maxChars;
  const displayedText = shouldTruncate
    ? text.slice(0, maxChars).trimEnd() + suffix
    : text;

  return (
    <Tag className={className} {...rest}>
      {displayedText}
    </Tag>
  );
}
