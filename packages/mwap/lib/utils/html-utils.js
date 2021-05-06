exports.quoteattr = function quoteattr(s, preserveCR) {
  preserveCR = preserveCR ? "&#13;" : "\n";
  return (
    ("" + s) /* Forces the conversion to string. */
      .replace(/&/g, "&amp;") /* This MUST be the 1st replacement. */
      .replace(/'/g, "&apos;") /* The 4 other predefined entities, required. */
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      /*
      You may add other replacements here for HTML only 
      (but it's not necessary).
      Or for XML, only if the named entities are defined in its DTD.
      */
      .replace(/\r\n/g, preserveCR) /* Must be before the next replacement. */
      .replace(/[\r\n]/g, preserveCR)
  );
};

exports.walk = function walk(node, handlers) {
  if (Array.isArray(node)) {
    node.forEach((n) => walk(n, handlers));
  } else {
    if (node.type === "tag" && handlers[node.name]) {
      handlers[node.name](node);
    } else if (handlers[node.type]) {
      handlers[node.type](node);
    }

    if (node.children) {
      walk(node.children, handlers);
    }
  }
};

////////////// HTML Parser and Stringifier taken from https://github.com/HenrikJoreteg/html-parse-stringify

const lookup = {
  area: true,
  base: true,
  br: true,
  col: true,
  embed: true,
  hr: true,
  img: true,
  input: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true,
};

const attrRE = /\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?(".*?"|'.*?')/g;

function parseTag(tag) {
  const res = {
    type: "tag",
    name: "",
    voidElement: false,
    attrs: {},
    children: [],
  };

  const tagMatch = tag.match(/<\/?([^\s]+?)[/\s>]/);
  if (tagMatch) {
    res.name = tagMatch[1];
    if (
      lookup[tagMatch[1].toLowerCase()] ||
      tag.charAt(tag.length - 2) === "/"
    ) {
      res.voidElement = true;
    }

    // handle comment tag
    if (res.name.startsWith("!--")) {
      const endIndex = tag.indexOf("-->");
      return {
        type: "comment",
        comment: endIndex !== -1 ? tag.slice(4, endIndex) : "",
      };
    }
  }

  const reg = new RegExp(attrRE);
  let result = null;
  for (;;) {
    result = reg.exec(tag);

    if (result === null) {
      break;
    }

    if (!result[0].trim()) {
      continue;
    }

    if (result[1]) {
      const attr = result[1].trim();
      let arr = [attr, ""];

      if (attr.indexOf("=") > -1) {
        arr = attr.split("=");
      }

      res.attrs[arr[0]] = arr[1];
      reg.lastIndex--;
    } else if (result[2]) {
      res.attrs[result[2]] = result[3]
        .trim()
        .substring(1, result[3].length - 1);
    }
  }

  return res;
}

const tagRE = /<[a-zA-Z0-9\-\!\/](?:"[^"]*"|'[^']*'|[^'">])*>/g;

// re-used obj for quick lookups of components
const empty = Object.create(null);

exports.parse = function parse(html, options) {
  options || (options = {});
  options.components || (options.components = empty);
  const result = [];
  const arr = [];
  let current;
  let level = -1;
  let inComponent = false;

  // handle text at top level
  if (html.indexOf("<") !== 0) {
    var end = html.indexOf("<");
    result.push({
      type: "text",
      content: end === -1 ? html : html.substring(0, end),
    });
  }

  html.replace(tagRE, function (tag, index) {
    if (inComponent) {
      if (tag !== "</" + current.name + ">") {
        return;
      } else {
        inComponent = false;
      }
    }
    const isOpen = tag.charAt(1) !== "/";
    const isComment = tag.startsWith("<!--");
    const start = index + tag.length;
    const nextChar = html.charAt(start);
    let parent;

    if (isComment) {
      const comment = parseTag(tag);

      // if we're at root, push new base node
      if (level < 0) {
        result.push(comment);
        return result;
      }
      parent = arr[level];
      parent.children.push(comment);
      return result;
    }

    if (isOpen) {
      level++;

      current = parseTag(tag);
      if (current.type === "tag" && options.components[current.name]) {
        current.type = "component";
        inComponent = true;
      }

      if (
        !current.voidElement &&
        !inComponent &&
        nextChar &&
        nextChar !== "<"
      ) {
        current.children.push({
          type: "text",
          content: html.slice(start, html.indexOf("<", start)),
        });
      }

      // if we're at root, push new base node
      if (level === 0) {
        result.push(current);
      }

      parent = arr[level - 1];

      if (parent) {
        parent.children.push(current);
      }

      arr[level] = current;
    }

    if (!isOpen || current.voidElement) {
      if (
        level > -1 &&
        (current.voidElement || current.name === tag.slice(2, -1))
      ) {
        level--;
        // move current up a level to match the end tag
        current = level === -1 ? result : arr[level];
      }
      if (!inComponent && nextChar !== "<" && nextChar) {
        // trailing text node
        // if we're at the root, push a base text node. otherwise add as
        // a child to the current node.
        parent = level === -1 ? result : arr[level].children;

        // calculate correct end of the content slice in case there's
        // no tag after the text node.
        const end = html.indexOf("<", start);
        const content = html.slice(start, end === -1 ? undefined : end);
        // if a node is nothing but whitespace, no need to add it.
        if (!/^\s*$/.test(content)) {
          parent.push({
            type: "text",
            content: content,
          });
        }
      }
    }
  });

  return result;
};

function attrString(attrs) {
  const buff = [];
  for (let key in attrs) {
    buff.push(key + '="' + attrs[key] + '"');
  }
  if (!buff.length) {
    return "";
  }
  return " " + buff.join(" ");
}

function stringifyPrivate(buff, doc) {
  switch (doc.type) {
    case "text":
      return buff + doc.content;
    case "tag":
      buff +=
        "<" +
        doc.name +
        (doc.attrs ? attrString(doc.attrs) : "") +
        (doc.voidElement ? "/>" : ">");
      if (doc.voidElement) {
        return buff;
      }
      return (
        buff + doc.children.reduce(stringifyPrivate, "") + "</" + doc.name + ">"
      );
    case "comment":
      buff += "<!--" + doc.comment + "-->";
      return buff;
  }
}

exports.stringify = function stringify(doc) {
  return doc.reduce(function (token, rootEl) {
    return token + stringifyPrivate("", rootEl);
  }, "");
};
