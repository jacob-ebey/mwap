import * as React from "react";
import { Suspense } from "react";

import { ErrorBoundary } from "@mwap/app";
import { Head } from "@mwap/head";
import { Link } from "@mwap/router";

import Container from "../components/container";
import menu from "../content/docs-menu.json";

import Article from "./article";

const DocsPage = () => {
  return (
    <>
      <Head>
        <title>Docs</title>
      </Head>

      <div className="max-w-2xl mx-auto lg:mx-auto lg:grid lg:grid-flow-col lg:max-w-min">
        <div>
          <nav className="px-6 my-16 lg:w-64 lg:sticky lg:top-16">
            <h1 className="mb-4 text-2xl font-semibold">Documentation</h1>

            <ul>
              {menu.map(({ label, to }, idx) => (
                <li key={`${idx}-${to}`}>
                  <Link
                    to={to}
                    className="block py-1 mt-2 text-gray-700 hover:text-gray-900"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
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
