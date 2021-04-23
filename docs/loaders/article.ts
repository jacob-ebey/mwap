import matter from "gray-matter";
import renderToString from "@mwap/mdx-remote/render-to-string";
import yaml from "js-yaml";

import components from "../components/mdx-components";

import type { Loader } from "@mwap/loaders";

export type ArticleParams = {
  article?: string;
};
export type ArticleData = {
  articleMdxSource: any;
  title: string;
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

  const articleMdxSource = await renderToString(matterResult.content, {
    components,
    scope,
  });

  return {
    articleMdxSource,
    title: matterResult.data.title,
  };
};

export default { loader };
