import * as React from "react";
import { FC, HTMLAttributes } from "react";
import cn from "classnames";

const Container: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div className={cn("max-w-2xl mx-auto px-6 mb-16", className)} {...props} />
  );
};

export default Container;
