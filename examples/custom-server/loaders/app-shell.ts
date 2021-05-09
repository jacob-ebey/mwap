import type { Loader } from "mwap";

export type AppShellProps = {
  title: string;
};

const loader: Loader<AppShellProps> = () => {
  return {
    title: "AppShell",
  };
};

export default { loader };
