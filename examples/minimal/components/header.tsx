import * as React from "react";
import type { FC } from "react";

import { Link } from "@mwap/router";

const Header: FC = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link> |{" "}
          </li>
          <li>
            <Link
              to={`/about?message=${encodeURI("Test Message From Search")}`}
            >
              About with search param
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
