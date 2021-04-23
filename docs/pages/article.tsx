import * as React from "react";
import { useMemo } from "react";

import mdxHydrate from "@mwap/mdx-remote/hydrate";
import { useLoader } from "@mwap/loaders";
import { useParams } from "@mwap/router";

import components from "../components/mdx-components";
import type { ArticleData, ArticleParams } from "../loaders/article";
import { Head } from "@mwap/head";

const Article = () => {
  const { article } = useParams<ArticleParams>();
  const { articleMdxSource, title } = useLoader<ArticleData, ArticleParams>(
    "article",
    {
      article,
    }
  );

  const content = mdxHydrate(articleMdxSource, { components });

  return (
    <>
      <Head>{title && <title>{title}</title>}</Head>
      <article className="prose max-w-none">{content}</article>
    </>
  );
};

export default Article;
