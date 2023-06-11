import { createContext } from "solid-js";
import { createSignal } from "solid-js";
import { useContext } from "solid-js";

interface UserPermissions {
  userPermissions: () => string[] | undefined;
  setUserPermissions: (value: string[]) => void;
}

export const UserPermissionsContext = createContext<UserPermissions>({
  userPermissions: () => [],
  setUserPermissions: (value: string[]) => {},
});

export function UserPermissionsProvider(props: { children: any }) {
  const [userPermissions, setUserPermissions] = createSignal<string[]>([]);

  return (
    <UserPermissionsContext.Provider
      value={{ userPermissions, setUserPermissions }}
    >
      {props.children}
    </UserPermissionsContext.Provider>
  );
}

export function useUserPermissions() {
  return useContext(UserPermissionsContext);
}
