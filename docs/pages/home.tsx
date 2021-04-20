import * as React from "react";

import { Head } from "@mwap/head";
import { Link } from "@mwap/router";

import ComponentRenderer from "../components/components-renderer";
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
