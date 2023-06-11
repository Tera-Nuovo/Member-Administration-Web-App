import InputField from "~/components/InputField";
import MultiInputField from "~/components/MultiInputField";
import ErrorMessage from "~/components/ErrorMessage";
import { member, setMember, errors } from "~/routes/addNewMember";
import { useNavigate } from "solid-start";
import HiddenInputField from "~/components/HiddenInputField";
import PostalCodeField from "./postalCodeField";
import { Show } from "solid-js";
import { CountryField } from "./CountryFIeld";
import { createSignal } from "solid-js";
import { Contry } from "~/types";
import PostCodeField from "./postalCodeField";

function AddMemberForm() {
  const navigate = useNavigate();


  function handleCancel() {
    setMember(undefined);
    navigate("/searchmembers");
  }

  const handleChange = (
    propertyName: string,
    value: string | number | string[] | null | undefined
  ) => {
    setMember((prevState) => ({ ...prevState, [propertyName]: value ?? null }));
  };

  return (
    <>
      <InputField
        valueType="Name"
        value={member()?.name}
        propertyName="name"
        onChange={handleChange}
      />
      <ErrorMessage error={errors().name} />
      <InputField
        valueType="Email"
        value={member()?.mail}
        propertyName="mail"
        onChange={handleChange}
      />
      <ErrorMessage error={errors().mail} />
      <MultiInputField
        valueType="Phone"
        value={member()?.phone}
        propertyName="phone"
        onChange={handleChange}
      />
      <ErrorMessage error={errors().phone} />
      <InputField
        valueType="Address 1"
        value={member()?.adress1}
        propertyName="adress1"
        onChange={handleChange}
      />
      <ErrorMessage error={errors().adress1} />
      <InputField
        valueType="Address 2"
        value={member()?.adress2}
        propertyName="adress2"
        onChange={handleChange}
      />
      <ErrorMessage error={errors().adress2} />
      <PostCodeField postCode={member()?.postcode} city={member()?.city} />
      <CountryField />
      <div class="grid">
        <button type="submit">Save</button>
        <button class="btn-red" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </>
  );
}

export default AddMemberForm;
