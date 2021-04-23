import * as React from "react";

import { Link } from "@mwap/router";

type RelatedListLink = {
  label: string;
  to: string;
};

type RelatedListProps = {
  links: RelatedListLink[];
};

const RelatedList = ({ links }: RelatedListProps) => (
  <ul className="list-none">
    {links.map(({ label, to }, idx) => (
      <li key={`${idx}-${to}`}>
        <Link to={to}>{label}</Link>
      </li>
    ))}
  </ul>
);

export default RelatedList;
