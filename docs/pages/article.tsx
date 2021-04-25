import * as React from "react";
import { useContext } from "react";
import mdxHydrate from "next-mdx-remote/hydrate";
import { asyncContext } from "@mwap/async";
import { useLoader } from "@mwap/loaders";
import { useParams } from "@mwap/router";

import components from "../components/mdx-components";
import type { ArticleData, ArticleParams } from "../loaders/article";
import { Head } from "@mwap/head";

const Article = () => {
  const asyncCtx = useContext(asyncContext);
  const { article } = useParams<ArticleParams>();
  const { articleMdxSource, chunks, title } = useLoader<
    ArticleData,
    ArticleParams
  >("article", {
    article,
  });

  if (asyncCtx?.chunks && chunks) {
    chunks.forEach((chunk) => asyncCtx.chunks.add(chunk));
  }

  const content = mdxHydrate(articleMdxSource, { components });

  return (
    <>
      <Head>{title && <title>{title}</title>}</Head>
      <article className="prose max-w-none">{content}</article>
    </>
  );
};

export default Article;
