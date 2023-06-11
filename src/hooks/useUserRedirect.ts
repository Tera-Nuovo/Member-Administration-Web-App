// hooks/useUserRedirect.ts
import { createServerData$ } from "solid-start/server";
import { getUser } from "~/serverSide/session";
import { redirect } from "solid-start/server";

export function useUserRedirect() {
  return createServerData$(async (_, { request }) => {
    const user = await getUser(request);

    if (!user) {
      throw redirect("/login");
    }
    return user;
  });
}
