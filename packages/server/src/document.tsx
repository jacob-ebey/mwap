import * as React from "react";
import { Fragment, createContext, useContext } from "react";
import type { FC } from "react";

import type { LoaderCacheValue } from "./loaders";

export type ClientBuildStats = {
  assetsByChunkName: { [chunkName: string]: string[] };
};

type DocumentContext = {
  appHtml: string;
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

export const Body = ({ publicPath = "/.mwap/" }) => {
  const { appHtml, loaderCache, stats } = useContext(documentContext);

  return (
    <Fragment>
      <div id="__mwap__" dangerouslySetInnerHTML={{ __html: appHtml }} />
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
      {stats.assetsByChunkName["main"].map((asset) =>
        asset.endsWith(".js") ? (
          <script key={asset} src={`${publicPath}${asset}`} />
        ) : null
      )}
    </Fragment>
  );
};

export const Head = () => null;
