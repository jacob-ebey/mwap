import type { Loader, LoaderConfigFunc } from "mwap";
import type { Team } from "../db";

import db from "../db";

export type TeamPageData = {
  teams: Team[];
  ttl: number;
};

const loader: Loader<TeamPageData> = async () => {
  const teams = await db.team.findMany({});

  return {
    teams,
    ttl: 604800,
  };
};

const config: LoaderConfigFunc<TeamPageData> = ({ data }) => ({
  headers: {
    "cache-control": `public, max-age=${data.ttl}`,
  },
});

export default { loader, config };
