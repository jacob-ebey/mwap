import type { Loader } from "mwap";

export type AppShellProps = {
  title: string;
};

const loader: Loader<AppShellProps> = () => {
  console.dir(process.env, { colors: true, depth: null });
  return {
    title: "AppShell",
  };
};

export default { loader };
