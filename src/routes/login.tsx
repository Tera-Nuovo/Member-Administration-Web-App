import { Show } from "solid-js";
import { useParams, useRouteData } from "solid-start";
import { useLogin } from "~/hooks/useLogin";
import { createServerData$, redirect } from "solid-start/server";
import { getUser } from "~/serverSide/session";
import { useUserPermissions } from "~/components/userPermissionsContext";
import { onMount } from "solid-js";

export function routeData() {
  return createServerData$(async (_, { request }) => {
    if (await getUser(request)) {
      throw redirect("/");
    }
    return {};
  });
}

export default function Login() {
  const data = useRouteData<typeof routeData>();
  const params = useParams();
  const { userPermissions, setUserPermissions } = useUserPermissions();

  onMount(() => {
    setUserPermissions([]);
  });

  const [loggingIn, { Form }] = useLogin();

  return (
    <main>
      <div class="container">
        <h1>Login</h1>
        <p>username: placeholder</p>
        <p>password: placeholder</p>
        <Form>
          <input
            type="hidden"
            name="redirectTo"
            value={params.redirectTo ?? "/"}
          />
          <div>
            <label for="username-input">Username</label>
            <input name="username" />
          </div>
          <Show when={loggingIn.error?.fieldErrors?.username}>
            <p role="alert">{loggingIn.error.fieldErrors.username}</p>
          </Show>
          <div>
            <label for="password-input">Password</label>
            <input name="password" type="password" />
          </div>
          <Show when={loggingIn.error?.fieldErrors?.password}>
            <p role="alert">{loggingIn.error.fieldErrors.password}</p>
          </Show>
          <Show when={loggingIn.error}>
            <p role="alert" id="error-message">
              {loggingIn.error.message}
            </p>
          </Show>
          <button type="submit">{data() ? "Login" : ""}</button>
        </Form>
      </div>
    </main>
  );
}
