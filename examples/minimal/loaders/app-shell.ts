import type { Loader, LoaderConfigFunc } from "@mwap/loaders";

export type AppShellProps = {
  title: string;
};

const loader: Loader<AppShellProps> = () => {
  return {
    title: "AppShell",
  };
};

export default { loader };
