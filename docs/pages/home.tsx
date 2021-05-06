import * as React from "react";
import { Helmet } from "react-helmet-async";

import ComponentRenderer from "../components/async/components-renderer";
import Container from "../components/container";
import content from "../content/home.json";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <Container>
        <ComponentRenderer components={content.components} />
      </Container>
    </>
  );
};

export default HomePage;
