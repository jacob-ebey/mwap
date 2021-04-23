import * as React from "react";

import { Body, Head, Html } from "@mwap/server";

const Document = () => {
  return (
    <Html>
      <Head>
        <meta charSet="utf-8" />
      </Head>
      <Body>
        <script async src="https://api.countapi.xyz/hit/mysite.com/visits" />
      </Body>
    </Html>
  );
};

export default Document;
