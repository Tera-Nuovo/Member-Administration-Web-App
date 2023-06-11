import { redirect } from "solid-start/server";
import { createCookieSessionStorage } from "solid-start/session";
import { User } from "~/types";
import { placeholderAuth } from "./placeholderAuth";

type LoginForm = {
  username: string;
  password: string;
};

export async function login({ username, password }: LoginForm) {
  const user: User | null = await placeholderAuth(username, password);
  if (!user) return null;
  return user;
}

const storage = createCookieSessionStorage({
  cookie: {
    name: "session",
    secure: true,
    secrets: ["secret"],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export function getUserSession(request: Request) {
  return storage.getSession(request.headers.get("Cookie"));
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return userId;
}

export async function getUser(request: Request) {
  const session = await getUserSession(request);
  const userData = session.get("userData");
  if (!userData || typeof userData !== "object") return null;
  const user: User = userData as User;
  return user;
}

export async function logout(request: Request) {
  const session = await storage.getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}

export async function createUserSession(
  userData: User | null,
  redirectTo: string
) {
  const session = await storage.getSession();
  session.set("userData", userData);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}
