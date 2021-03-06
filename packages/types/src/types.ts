type CommonArgs = {
  cwd: string;
  dist: string;
  mode: "development" | "production";
  progress?: boolean;
};

export type BuildArgs = CommonArgs & {
  entry?: string;
  analyze?: boolean;
  inspect?: boolean;
  verbose?: boolean;
};

export type StartArgs = CommonArgs & {
  port: number;
};

export type DevArgs = CommonArgs;
