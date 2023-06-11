import { createEffect, createSignal, JSX } from "solid-js";
import { useGetCountries } from "~/hooks/useGetCountries";
import { For } from "solid-js";
import { Contry } from "~/types";

interface CountryFieldProps {
  selectedCountry: () => Contry;
  setSelectedCountry: (value: string) => void;
}

export function CountryField() {
  const countries = useGetCountries();
  const [selectedCountry, setSelectedCountry] = createSignal<Contry>({
    contrycode: "DK",
    contryname: "Denmark",
  });

  createEffect(() => {
    if (countries()?.length) {
      const denmark = countries()?.find(
        (country) => country.contrycode === "DK"
      );
      if (denmark) setSelectedCountry(denmark);
    }
  });

  return (
    <>
      <div class="container">
        <div>
          <strong>Country</strong>
        </div>
        <select value={selectedCountry().contrycode} name="country">
          <option value={selectedCountry().contrycode}>
            {selectedCountry().contryname}
          </option>
          <For each={countries()}>
            {(country) => (
              <option value={country.contrycode}>{country.contryname}</option>
            )}
          </For>
        </select>
      </div>
    </>
  );
}

export default CountryField;