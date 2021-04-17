import type { ComponentType } from "react";

export type Page = {
  component: ComponentType;
  exact?: boolean;
  path: string;
};
