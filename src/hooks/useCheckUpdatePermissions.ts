import { useUserPermissions } from "~/components/userPermissionsContext";
import { useUpdateMemberFull } from "~/hooks/useUpdateMemberFull";
import { useUpdateMemberLimited } from "~/hooks/useUpdateMemberLimited";

export const useCheckUpdatePermissions = () => {
  const { userPermissions } = useUserPermissions();

  if (userPermissions()?.includes("placeholder")) {
    return useUpdateMemberFull();
  } else {
    return useUpdateMemberLimited();
  }
};
