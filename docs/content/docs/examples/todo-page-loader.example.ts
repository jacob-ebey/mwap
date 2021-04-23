import { fetch } from "cross-fetch";
import type { Loader } from "@mwap/loaders";

export type TodoPageData = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type TodoPageArgs = {
  id: string | number;
};

const loader: Loader<TodoPageData, TodoPageArgs> = async ({ params }) => {
  return fetch(
    `https://jsonplaceholder.typicode.com/todos/${params.id}`
  ).then((response) => response.json());
};

export default { loader };
