import * as React from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import mdxHydrate from "next-mdx-remote-suspense/hydrate";

import { asyncContext } from "@mwap/async";
import { useLoader } from "mwap";

import components from "../components/mdx-components";
import type { ArticleData, ArticleParams } from "../loaders/article";

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
      <Helmet>{title && <title>{title}</title>}</Helmet>
      <article className="prose max-w-none">{content}</article>
    </>
  );
};

export default Article;
