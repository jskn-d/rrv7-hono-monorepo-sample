import type { Route } from "./+types/home";
import {client} from "~/lib/client";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ context }: Route.LoaderArgs) {
  const res = await client.hello.$get();
  const hello = await res.json();
  return {
    hello: hello.message
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
      <div>
        {loaderData.hello}
      </div>
  )
}