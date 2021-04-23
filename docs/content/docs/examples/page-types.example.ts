import type { ComponentType } from "react";

// import type { Page } from "@mwap/app";
export type Page = {
  /**
   * A React component to render only when
   * the location matches.
   */
  component: ComponentType;
  /**
   * When true, will only match if the path
   * matches the location.pathname exactly.
   */
  exact?: boolean;
  /**
   * Any valid URL path or array of paths that
   * path-to-regexp@^1.7.0 understands.
   */
  path: string;
};
