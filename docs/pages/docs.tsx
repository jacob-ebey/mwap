import * as React from "react";
import { FC } from "react";

import { Head } from "@mwap/head";

import ComponentRenderer from "../components/components-renderer";
import Container from "../components/container";

type DocsPageProps = {
  components: any[];
};

const DocsPage: FC<DocsPageProps> = ({ components, children }) => {
  return (
    <>
      <Head>
        <title>Docs</title>
      </Head>

      <Container>
        {components && <ComponentRenderer components={components} />}

        <article>{children}</article>
      </Container>
    </>
  );
};

export default DocsPage;
