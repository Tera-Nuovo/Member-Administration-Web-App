import { useUserPermissions } from "~/components/userPermissionsContext";


export const useCanEditFull = () => {
  const { userPermissions } = useUserPermissions();


  if (userPermissions()?.includes("placeholder")) {
    return true;
  } else {
    return false;
  }
};
