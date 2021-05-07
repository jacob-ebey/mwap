import * as React from "react";
import { Fragment, createContext, useContext } from "react";
import type { FC } from "react";

import type { FilledContext } from "react-helmet-async";

import type { LoaderCacheValue } from "./loaders";

export type ClientBuildStats = {
  assetsByChunkName: { [chunkName: string]: string[] };
};

type DocumentContext = {
  appHtml: string;
  chunks: Set<string | number>;
  helmet: FilledContext["helmet"];
  loaderCache: Map<string, LoaderCacheValue<unknown>>;
  stats: ClientBuildStats;
};

const documentContext = createContext<DocumentContext | null>(
  {} as DocumentContext
);

export const DocumentProvider: FC<DocumentContext> = ({
  children,
  ...value
}) => {
  return (
    <documentContext.Provider value={value}>
      {children}
    </documentContext.Provider>
  );
};

type PublicPathProps = {
  publicPath?: string;
};

export const Body: FC<PublicPathProps> = ({
  publicPath = "/.mwap/",
  children,
}) => {
  const { appHtml, chunks, helmet, loaderCache, stats } = useContext(
    documentContext
  );

  return (
    <body {...helmet.bodyAttributes.toComponent()}>
      {helmet.noscript.toComponent()}
      <div id="__mwap__" dangerouslySetInnerHTML={{ __html: appHtml }} />
      {children}
      <script
        type="__ASYNC_CHUNKS__"
        dangerouslySetInnerHTML={{
          __html: encodeURI(JSON.stringify(Array.from(chunks))),
        }}
      />
      <script
        type="__SSR_DATA__"
        dangerouslySetInnerHTML={{
          __html: encodeURI(
            JSON.stringify(
              Array.from(loaderCache.entries()).map(([id, rest]) => ({
                id,
                ...rest,
              }))
            )
          ),
        }}
      />
      {helmet.script.toComponent()}
      {Array.from(chunks).map((chunk) =>
        stats.assetsByChunkName[chunk] ? (
          <Fragment key={chunk}>
            {stats.assetsByChunkName[chunk].map((asset) =>
              !asset.includes("hot-update") && asset.endsWith(".js") ? (
                <script key={asset} async defer src={`${publicPath}${asset}`} />
              ) : null
            )}
          </Fragment>
        ) : null
      )}
      {["vendors", "main"].map((chunk) =>
        stats.assetsByChunkName[chunk] ? (
          <Fragment key={chunk}>
            {stats.assetsByChunkName[chunk].map((asset) =>
              !asset.includes("hot-update") && asset.endsWith(".js") ? (
                <script key={asset} defer src={`${publicPath}${asset}`} />
              ) : null
            )}
          </Fragment>
        ) : null
      )}
    </body>
  );
};

export const Html: FC = ({ children }) => {
  const { helmet } = useContext(documentContext);

  return <html {...helmet.htmlAttributes.toComponent()}>{children}</html>;
};

export const Head: FC<PublicPathProps> = ({
  publicPath = "/.mwap/",
  children,
}) => {
  const { chunks, stats, helmet } = useContext(documentContext);

  return (
    <head>
      {helmet.title.toComponent()}
      {helmet.meta.toComponent()}
      {helmet.style.toComponent()}
      {helmet.link.toComponent()}

      {Array.from(chunks).map((chunk) =>
        stats.assetsByChunkName[chunk] ? (
          <Fragment key={chunk}>
            {stats.assetsByChunkName[chunk].map((asset) =>
              asset.endsWith(".css") ? (
                <link
                  key={asset}
                  rel="stylesheet"
                  href={`${publicPath}${asset}`}
                />
              ) : null
            )}
          </Fragment>
        ) : null
      )}
      {stats.assetsByChunkName["main"].map((asset) =>
        asset.endsWith(".css") ? (
          <link key={asset} rel="stylesheet" href={`${publicPath}${asset}`} />
        ) : null
      )}
      {children}
    </head>
  );
};
