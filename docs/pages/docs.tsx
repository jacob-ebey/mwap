import * as React from "react";
import { Suspense } from "react";
import { Helmet } from "react-helmet-async";

import { ErrorBoundary } from "mwap";

import Container from "../components/container";
import NavMenu from "../components/nav-menu";

import menu from "../content/docs-menu.json";

import Article from "./article";

const DocsPage = () => {
  return (
    <>
      <Helmet>
        <title>Docs</title>
      </Helmet>

      <div className="max-w-2xl mx-auto lg:mx-auto lg:grid lg:grid-flow-col lg:max-w-min">
        <div>
          <NavMenu title="Docs" items={menu} />
        </div>

        <Container className="lg:w-screen lg:ml-0 lg:max-w-2xl">
          <ErrorBoundary>
            <Suspense fallback="">
              <Article />
            </Suspense>
          </ErrorBoundary>
        </Container>
      </div>
    </>
  );
};

export default DocsPage;
