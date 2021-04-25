import * as React from "react";

import { Link } from "@mwap/router";

type HeaderProps = {
  darkModeEnabled: boolean;
  onDarkModeToggled: () => void;
};

const Header = ({ darkModeEnabled, onDarkModeToggled }: HeaderProps) => (
  <header className="flex flex-wrap max-w-2xl px-4 py-4 mx-auto mb-4">
    <Link to="/" className="inline-flex items-center p-2 hover:bg-yellow-100">
      <svg
        className="inline-block w-5 h-5 mr-3 bg-black dark:bg-gray-300"
        fill="currentColor"
      >
        <path d="M0 0h19v19H0z" />
      </svg>
      <span className="text-lg font-semibold">@mwap</span>
    </Link>

    <nav className="inline-flex items-center justify-end flex-grow">
      <button onClick={onDarkModeToggled}>
        {darkModeEnabled ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 mr-4 text-gray-700 dark:text-gray-300"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 mr-4 text-gray-700 dark:text-gray-300"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </button>
      <a
        className="p-2 mr-2 text-xs font-semibold text-gray-700 dark:text-gray-300"
        href="https://github.com/jacob-ebey/mwap"
      >
        Source
      </a>
      <a
        href="https://twitter.com/ebey_jacob"
        className="p-2 text-xs font-semibold text-white bg-black dark:text-black dark:bg-white"
      >
        Follow Me
      </a>
    </nav>
  </header>
);

export default Header;
