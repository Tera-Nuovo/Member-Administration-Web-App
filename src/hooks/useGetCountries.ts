import { createServerData$ } from "solid-start/server";
import { DummyDatabaseInstance } from "~/serverSide/services/services";

export const useGetCountries = () => {
  return createServerData$(async () => {
    const countryData = await DummyDatabaseInstance.getCountry();

    const hasErrors = !countryData ?? countryData.length === 0;
    if (hasErrors) {
      throw new Error("Could not get country data");
    }
    return countryData;
  });
};
