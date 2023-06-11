import { createServerAction$, redirect } from "solid-start/server";
import { Member } from "~/types";
import { DummyDatabaseInstance } from "~/serverSide/services/services";
import { useMemberValidation } from "./useMemberValidation";
import { getUser } from "~/serverSide/session";

export const useUpdateMemberLimited = () => {
  const [submittingMember, { Form }] = createServerAction$(
    async (formData: FormData, { request }) => {
      const user = await getUser(request);

      if (!user) {
        throw redirect("/login");
      }

      if (!user?.groups?.includes("placeholder")) {
        if (user?.m_id === formData.get("m_id")) {
        } else {
          throw redirect("/searchmembers");
        }
      }

      let member: Member | undefined = await DummyDatabaseInstance.getMember(
        Number(formData.get("m_id"))
      );

      member = {
        ...member,
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
        let updatedMember = await DummyDatabaseInstance.updateMember(member);

        return updatedMember;
      }
    }
  );
  return { submittingMember, Form };
};
