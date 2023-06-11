import { Member } from "~/types";

export function useMemberValidation(member: Member | undefined | null) {
  const errors: Partial<Record<keyof Member, string>> = {};
  try {
    if (!member) {
      throw new Error("Member is undefined or null");
    }
    if (!member.name || member.name.trim().length === 0) {
      errors.name = "Name is required";
    }

    if (member.name?.match(/[^a-zA-ZæøåÆØÅ\- ]/)) {
      errors.name = "Name can only contain letters, dash and space";
    }

    member.phone?.forEach((phone) => {
      if (phone.match(/[^0-9\-\(\)\+ ]/)) {
        errors.phone = "Phone number can only contain numbers, -, () and +.";
      }
    });

    if (member.mail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.mail)) {
      errors.mail = "Email is not valid";
    }

    return errors;
  } catch (e) {
    return errors;
  }
}
