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
  const resUser = await client.users.$get();
  const resUserId = await client.users.$get({ id: 1 });
  const hello = await res.json();
  const users = await resUser.json();
  const userById = await resUserId.json();
  return {
    hello: hello.message,
    user: users[0],
    userById: userById[0],
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
      <>
        <div>
          {loaderData.hello}
        </div>
        <h2>User</h2>
        <p>{loaderData.user.name}</p>
        <p>{loaderData.user.email}</p>
        <h2>UserById</h2>
        <p>{loaderData.userById.name}</p>
      </>
  )
}