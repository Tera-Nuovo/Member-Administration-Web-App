import { createServerData$ } from "solid-start/server";
import { DummyDatabaseInstance } from "~/serverSide/services/services";

export const useGetPostalCodesAndCities = () => {
  return createServerData$(async () => {
    const postCodes = await DummyDatabaseInstance.getPostcode();

    const hasErrors = !postCodes ?? postCodes.length === 0;
    if (hasErrors) {
      throw new Error("Could not get post code data");
    }
    return postCodes;
  });
};
