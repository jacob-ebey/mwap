import * as React from "react";

import { Link } from "react-router-dom";

type HeroLinkProps = {
  label: string;
  to: string;
};

type HeroProps = {
  title: string;
  description: string;
  link: HeroLinkProps;
};

const Hero = ({ description, link, title }: HeroProps) => (
  <section>
    <h1 className="mt-16 text-6xl font-bold">{title}</h1>

    <p className="w-full mt-16 text-gray-500 description md:w-2/3">
      {description}
    </p>

    <Link
      to={link.to}
      className="inline-block mt-5 text-sm font-semibold uppercase hover:underline"
    >
      {link.label}
    </Link>
  </section>
);

export default Hero;
