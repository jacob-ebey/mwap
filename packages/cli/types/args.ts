export type BuildArgs = {
  cwd: string;
  dist: string;
  mode: "development" | "production";
};

export type StartArgs = BuildArgs & {
  port: number;
};

export type DevArgs = StartArgs;
