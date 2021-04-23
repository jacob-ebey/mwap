import * as React from "react";

import Hero from "./hero";
import RelatedList from "./related-list";

const componentMap = {
  hero: Hero,
  "related-list": RelatedList,
};

type ComponentProps = {
  name: string;
  props: any;
};

type ComponentRendererProps = {
  components: ComponentProps[];
};

const ComponentRenderer = ({ components }: ComponentRendererProps) => {
  return (
    <>
      {components.map(({ name, props }, idx) => {
        const Component = componentMap[name];

        if (!Component) {
          return null;
        }

        return <Component key={`${name}-${idx}`} {...props} />;
      })}
    </>
  );
};

export default ComponentRenderer;
