//index.tsx
import { useRouteData } from "solid-start";
import { createServerAction$ } from "solid-start/server";
import { logout } from "~/serverSide/session";
import { For, createEffect } from "solid-js";
import { useUserRedirect } from "~/hooks/useUserRedirect";
import { useUserPermissions } from "~/components/userPermissionsContext";
import { onMount } from "solid-js";
import { useUser } from "~/components/userContext";

export function routeData() {
  return useUserRedirect();
}

export default function Home() {
  const u = useRouteData<typeof routeData>();
  const { userPermissions, setUserPermissions } = useUserPermissions();
  const { user, setUser } = useUser();

  createEffect(() => {
    setUser(u());
  });

  onMount(() => {

    const groups = u()?.groups ?? [];
    setUserPermissions(groups);
  });

  const [, { Form }] = createServerAction$((f: FormData, { request }) =>
    logout(request)
  );

  return (
    <>
      <main>
        <div class="container">
          <h1 class="font-bold text-3xl">Welcome {u()?.uid}!</h1>
          <article>
            <h2>Here are your groups</h2>
            <For each={u()?.groups}>
              {(group) => (
                <>
                  <p>{group}</p>
                  <hr />
                </>
              )}
            </For>
          </article>
          <Form>
            <button name="logout" type="submit">
              Logout
            </button>
          </Form>
        </div>
      </main>
    </>
  );
}
