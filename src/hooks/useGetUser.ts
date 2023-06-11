import { createServerData$ } from "solid-start/server";
import { getUser } from "~/serverSide/session";
import { User } from "~/types";

export function useGetUser() {
  return createServerData$(async (_, { request }) => {
    const user = await getUser(request);

    return user as User;
  });
}
