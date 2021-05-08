import * as React from "react";

import { Helmet } from "react-helmet-async";

const publicPath = process.env.PUBLIC_PATH.replace("dist/", "") || "";

const Meta = () => (
  <Helmet>
    <meta charSet="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href={`${publicPath}apple-touch-icon.png`}
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href={`${publicPath}favicon-32x32.png`}
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href={`${publicPath}favicon-16x16.png`}
    />
    <link rel="manifest" href={`${publicPath}site.webmanifest`} />
  </Helmet>
);

export default Meta;
