import { createContext } from "solid-js";
import { createSignal } from "solid-js";
import { useContext } from "solid-js";
import type { User } from "~/types";

interface IUser {
  user: () => User | undefined;
  setUser: (value: User | undefined) => void;
}

export const UserContext = createContext<IUser>({
  user: () => undefined,
  setUser: (value: User | undefined) => {},
});

export function UserProvider(props: { children: any }) {
  const [user, setUser] = createSignal<User | undefined>(undefined);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
