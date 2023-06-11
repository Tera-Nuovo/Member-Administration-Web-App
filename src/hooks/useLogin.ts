// useLogin.ts
import { createServerAction$, createServerData$, redirect } from "solid-start/server";
import { User } from "~/types";
import { FormError } from "solid-start";
import { createUserSession } from "~/serverSide/session";
import { login } from "~/serverSide/session";




export function validateUsername(username: unknown) {
    if (typeof username !== "string" || username.length < 3) {
        return `Usernames must be at least 3 characters long`;
    }
}

export function validatePassword(password: unknown) {
    if (typeof password !== "string" || password.length < 6) {
        return `Passwords must be at least 6 characters long`;
    }
}


export function useLogin() {

    return createServerAction$(async (form: FormData) => {
        const username = form.get("username");
        const password = form.get("password");
        const redirectTo = "/";
        if (
            typeof username !== "string" ||
            typeof password !== "string" ||
            typeof redirectTo !== "string"
        ) {
            throw new FormError(`Form not submitted correctly.`);
        }

        const fields = { username, password };
        const fieldErrors = {
            username: validateUsername(username),
            password: validatePassword(password)
        };
        if (Object.values(fieldErrors).some(Boolean)) {
            throw new FormError("Fields invalid", { fieldErrors, fields });
        }

        const user: User | null = await login({ username, password });
        if (!user) {
            throw new FormError(`Username/Password combination is incorrect`, {
                fields
            });
        }

        return createUserSession(user, redirectTo);
    });
}