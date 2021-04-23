import * as React from "react";
import { useLoader } from "@mwap/loaders";
import { useParams } from "@mwap/router";

import type { TodoPageData, TodoPageArgs } from "../loaders/todo";

const TodoPage = () => {
  const { id } = useParams<TodoPageArgs>();
  const todo = useLoader<TodoPageData, TodoPageArgs>("todo", { id });

  return (
    <pre>
      <code>{JSON.stringify(todo, null, 2)}</code>
    </pre>
  );
};

export default TodoPage;
