import * as React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import type { Language } from "prism-react-renderer";
import prismTheme from "prism-react-renderer/themes/oceanicNext";
import cn from "classnames";

type CodeProps = {
  code: string;
  language?: Language;
};

const Code = ({ code, language = "tsx" }: CodeProps) => {
  return (
    <Highlight
      {...defaultProps}
      theme={prismTheme as any}
      code={code}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={cn(className, "block overflow-x-auto mb-4 px-4")}
          style={style}
        >
          <code>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </code>
        </pre>
      )}
    </Highlight>
  );
};

export default Code;
