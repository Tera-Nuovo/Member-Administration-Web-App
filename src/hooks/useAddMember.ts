import { createServerAction$, redirect } from "solid-start/server";
import { Member } from "~/types";
import { useMemberValidation } from "./useMemberValidation";
import { getUser } from "~/serverSide/session";

import { DummyDatabaseInstance } from "~/serverSide/services/services";

export const useAddMember = () => {
  const [submittingMember, { Form }] = createServerAction$(
    async (formData: FormData, { request }) => {
      const user = await getUser(request);

      if (!user) {
        throw redirect("/login");
      }
      if (
        !user?.groups?.includes("placeholder") &&
        !user?.groups?.includes("placeholder")
      ) {
        throw redirect("/searchmembers");
      }

      const member: Member = {
        name: formData.get("name") as string,
        adress1: formData.get("adress1") as string,
        adress2: formData.get("adress2") as string,
        postcode: formData.get("postcode") as string,
        city: formData.get("city") as string,
        country: formData.get("country") as string,
        phone: formData.getAll("phone") as string[],
        mail: formData.get("mail") as string,
      };

      const validationErrors = useMemberValidation(member);
      const hasErrors = !!Object.keys(validationErrors).length;
      if (hasErrors) {
        throw new Error("Validation errors");
      } else {
        const result = await DummyDatabaseInstance.newMember(member);

        return result;
      }
    }
  );
  return { submittingMember, Form };
};
