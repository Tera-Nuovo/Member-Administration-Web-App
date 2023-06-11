import { createEffect, createSignal, JSX } from "solid-js";
import { useGetPostalCodesAndCities } from "~/hooks/useGetPostalCodesAndCities";
import { For } from "solid-js";
import { Postcodes } from "~/types";

interface PostalCodeFieldProps {
  postCode?: string | number | null | undefined;
  city?: string | null | undefined;
}

export function PostalCodeField(props: PostalCodeFieldProps) {
  const postalCodesAndCities = useGetPostalCodesAndCities();
  const [selectedPostalCodeAndCity, setSelectedPostalCodeAndCity] =
    createSignal<Postcodes>({ postcode: 0, city: "" });

  const handleInputChange = (event: InputEvent) => {
    const value = (event.target as HTMLInputElement).value;
    const matchedPostalCodeAndCity = postalCodesAndCities()?.find(
      (postalCodeAndCity) => postalCodeAndCity.postcode === Number(value)
    );
    if (matchedPostalCodeAndCity)
      setSelectedPostalCodeAndCity(matchedPostalCodeAndCity);
  };
  createEffect(() => {
    if (props) {
      setSelectedPostalCodeAndCity({
        postcode: Number(props.postCode),
        city: props.city || "",
      });
    }
  });
  return (
    <>
      <div class="container">
        <div>
          <strong>Postal Code</strong>
        </div>
        <input
          list="postal-codes"
          value={props.postCode || ""}
          onInput={handleInputChange}
          name="postcode"
        />
        <datalist class="hidden" id="postal-codes">
          <For each={postalCodesAndCities()}>
            {(postalCodeAndCity) => (
              <option value={postalCodeAndCity.postcode}>
                {postalCodeAndCity.city}
              </option>
            )}
          </For>
        </datalist>
      </div>
      <div>
        <strong>City</strong>
      </div>
      <input value={selectedPostalCodeAndCity()?.city} name="city" />
    </>
  );
}

export default PostalCodeField;
