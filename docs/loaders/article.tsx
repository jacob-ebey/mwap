import * as React from "react";
import { Suspense } from "react";
import matter from "gray-matter";
import renderToString from "next-mdx-remote-suspense/render-to-string";
import yaml from "js-yaml";

import { AsyncProvider } from "@mwap/async";
import type { Loader } from "@mwap/loaders";
import { StaticRouter } from "@mwap/router";

import components from "../components/mdx-components";

export type ArticleParams = {
  article?: string;
};
export type ArticleData = {
  articleMdxSource: any;
  title: string;
  chunks: Array<string | number>;
};

const matterConfig = {
  engines: {
    yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }),
  },
};

const loader: Loader<ArticleData, ArticleParams> = async ({ params }) => {
  const article = params.article || "intro";

  const { default: markdown } = await import(`../content/docs/${article}.mdx`);

  const matterResult = matter(markdown, matterConfig);

  const scope = ((await Promise.all(
    (Object.entries(
      matterResult.data.imports || {}
    ) as any).map(([name, request]) =>
      import(`../content/docs/${request.replace("./", "")}`).then((m) => [
        name,
        m.default,
      ])
    )
  )) as any).reduce(
    (acc, [name, value]) => Object.assign(acc, { [name]: value }),
    {}
  );

  const chunks = new Set<string | number>();
  const articleMdxSource = await renderToString(matterResult.content, {
    components,
    scope,
    provider: {
      component: ({ children }) => (
        <AsyncProvider chunks={chunks}>
          <StaticRouter location={`/docs/${article}`}>
            <Suspense fallback={""}>{children}</Suspense>
          </StaticRouter>
        </AsyncProvider>
      ),
      props: {},
    },
  });

  return {
    articleMdxSource,
    title: matterResult.data.title,
    chunks: Array.from(chunks),
  };
};

export default { loader };
