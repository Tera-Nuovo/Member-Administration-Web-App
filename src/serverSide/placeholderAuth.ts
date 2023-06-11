import { User } from "../types";

export async function placeholderAuth(
  username: string,
  password: string
): Promise<User | null> {
  return new Promise((resolve, reject) => {
    const placeholderUser = {
      uid: "placeholder",
      email: "placeholder",
      password: "placeholder",
      m_id: "placeholder",
      groups: ["placeholder"],
    };
    if (username === "placeholder" && password === "placeholder") {
      resolve(placeholderUser);
    } else {
      reject("error");
    }
  });
}
