import { useUserPermissions } from "~/components/userPermissionsContext";

export const useCanEditLimited = () => {
  const { userPermissions } = useUserPermissions();

  if (
    userPermissions()?.includes("placeholder") ||
    userPermissions()?.includes("placeholder")
  ) {
    return true;
  } else {
    return false;
  }
};
