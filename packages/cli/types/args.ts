type CommonArgs = {
  cwd: string;
  dist: string;
  mode: "development" | "production";
};

export type BuildArgs = CommonArgs & {
  analyze?: boolean;
  inspect?: boolean;
  verbose?: boolean;
};

export type StartArgs = CommonArgs & {
  port: number;
};

export type DevArgs = CommonArgs;
