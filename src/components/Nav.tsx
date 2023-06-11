// Nav.tsx

import { ThemeToggle } from "./ThemeButton";
import { Show, createEffect, onMount, createSignal } from "solid-js";
import logo from "../assets/logo.png";
import { useUserPermissions } from "~/components/userPermissionsContext";

import { useCanEditLimited } from "~/hooks/useCanEditLimited";
import { useCanSee } from "~/hooks/useCanSee";
import { useUser } from "./userContext";
import { useNavigate } from "solid-start";
import { useGetUser } from "~/hooks/useGetUser";
import { createServerData$ } from "solid-start/server";
import { User } from "~/types";

function Nav() {
  const { userPermissions, setUserPermissions } = useUserPermissions();
  const [canEditLimited, setCanEditLimited] = createSignal();
  const navigate = useNavigate();
  setCanEditLimited(useCanEditLimited());
  const u = useGetUser();
  const groups = u()?.groups ?? [];
  setUserPermissions(groups);
  setCanEditLimited(useCanEditLimited());

  createEffect(() => {
    const u = useUser();
    setCanEditLimited(useCanEditLimited());
  });

  return (
    <div class="container">
      <nav>
        <ul>
          <li>
            <img
              class="logo"
              src={logo}
              alt="Grobund logo"
              onClick={() => navigate("/")}
            />
          </li>
        </ul>
        <ul>
          <Show when={useCanSee()}>
            <li onClick={() => navigate("/searchmembers")}>Search Members</li>

            <Show when={canEditLimited()}>
              <li onClick={() => navigate("/addNewMember")}>Add New Member</li>
            </Show>
          </Show>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
