import type { Loader, LoaderConfigFunc } from "mwap";
import { PrismaClient } from "@prisma/client";

export type HomePageData = {
  name: string;
  ttl: number;
};

const loader: Loader<HomePageData> = async () => {
  const prisma = new PrismaClient();
  const teams = await prisma.team.findMany({});
  console.dir(teams, { colors: true, depth: null });

  return {
    name: "World",
    ttl: 604800,
  };
};

const config: LoaderConfigFunc<HomePageData> = ({ data }) => ({
  headers: {
    "cache-control": `public, max-age=${data.ttl}`,
  },
});

export default { loader, config };
