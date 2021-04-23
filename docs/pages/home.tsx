import * as React from "react";

import { Head } from "@mwap/head";

import ComponentRenderer from "../components/async/components-renderer";
import Container from "../components/container";
import content from "../content/home.json";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <Container>
        <ComponentRenderer components={content.components} />
      </Container>
    </>
  );
};

export default HomePage;
