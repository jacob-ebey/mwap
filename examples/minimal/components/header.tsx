import * as React from "react";
import type { FC } from "react";
import { Link } from "react-router-dom";

import styles from "./header.module.css";

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className="logo">
        Home
      </Link>
      <nav className={styles.headerRight}>
        <Link to="/about">About</Link>
        <Link to={`/about?message=${encodeURI("Test Message From Search")}`}>
          About with search param
        </Link>
      </nav>
    </header>
  );
};

export default Header;
