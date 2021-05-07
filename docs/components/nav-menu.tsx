import * as React from "react";
import { useState } from "react";
import cn from "classnames";

import { Link } from "react-router-dom";

type NavMenuItem = {
  label: string;
  to: string;
};

type NavMenuProps = {
  items: NavMenuItem[];
  title: string;
};

const NavMenu = ({ title, items }: NavMenuProps) => {
  const [open, setOpen] = useState(false);

  const handleLinkClicked = () => setOpen(false);
  const handleMenuClicked = () => setOpen(!open);

  return (
    <nav className="px-6 my-16 lg:w-64 lg:sticky lg:top-16">
      <div className="flex mb-4 lg:block">
        <h1 className="flex-grow block text-2xl font-semibold">{title}</h1>
        <button
          aria-label="nav menu"
          className="block py-1 text-gray-700 hover:text-gray-900 lg:hidden"
          onClick={handleMenuClicked}
        >
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </div>

      <ul
        className={cn(
          "transition-max-height duration-500 ease-in-out max-h-0 overflow-hidden lg:max-h-screen",
          open && "max-h-screen"
        )}
      >
        {items.map(({ label, to }, idx) => (
          <li key={`${idx}-${to}`}>
            <Link
              to={to}
              className="block py-1 mt-2 text-gray-700 hover:text-gray-900"
              onClick={handleLinkClicked}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavMenu;
