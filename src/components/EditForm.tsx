// EditForm.tsx
import InputField from "~/components/InputField";
import MultiInputField from "~/components/MultiInputField";
import ErrorMessage from "~/components/ErrorMessage";
import { editedMember, setEditedMember, errors } from "~/routes/editMember";
import { useNavigate } from "solid-start";
import HiddenInputField from "~/components/HiddenInputField";
import { setSelectedMember } from "~/routes/searchMembers";
import { selectedMember } from "~/routes/searchMembers";
import { Show } from "solid-js";
import { useUserPermissions } from "~/components/userPermissionsContext";
import CountryField from "./CountryFIeld";
import PostCodeField from "./postalCodeField";
import { useCanEditLimited } from "~/hooks/useCanEditLimited";
import { useCanEditFull } from "~/hooks/useCanEditFull";
import { createEffect, createSignal } from "solid-js";
import { User } from "~/types";

type Props = {
  user: User | undefined;
};

function EditForm({ user }: Props) {
  const navigate = useNavigate();
  const { userPermissions, setUserPermissions } = useUserPermissions();


  function handleCancel() {
    setEditedMember(undefined);
    setSelectedMember(undefined);
    navigate("/searchmembers");
  }

  const handleChange = (
    propertyName: string,
    value: string | number | string[] | null | undefined
  ) => {
    setEditedMember((prevState) => ({
      ...prevState,
      [propertyName]: value ?? null,
    }));
  };

  return (
    <>
      <Show
        when={
          (useCanEditLimited() && !useCanEditFull()) ||
          selectedMember()?.m_id === Number(user?.m_id)
        }
      >
        <HiddenInputField
          valueType="Name"
          value={editedMember()?.name}
          propertyName="name"
        />
        <HiddenInputField
          valueType="MemberNumber"
          value={editedMember()?.m_id}
          propertyName="m_id"
        />
        <HiddenInputField
          valueType="Oprettet"
          value={editedMember()?.created}
          propertyName="created"
        />
      </Show>

      <Show when={useCanEditFull()}>
        <HiddenInputField
          valueType="Member Number"
          value={editedMember()?.m_id}
          propertyName="m_id"
        />
        <HiddenInputField
          valueType="Oprettet"
          value={editedMember()?.created}
          propertyName="created"
        />
        <InputField
          valueType="Name"
          value={editedMember()?.name}
          propertyName="name"
          onChange={handleChange}
        />
        <ErrorMessage error={errors().name} />
      </Show>

      <InputField
        valueType="Email"
        value={editedMember()?.mail}
        propertyName="mail"
        onChange={handleChange}
      />
      <ErrorMessage error={errors().mail} />
      <MultiInputField
        valueType="Phone"
        value={editedMember()?.phone}
        propertyName="phone"
        onChange={handleChange}
      />
      <ErrorMessage error={errors().phone} />
      <InputField
        valueType="Address1"
        value={editedMember()?.adress1}
        propertyName="adress1"
        onChange={handleChange}
      />
      <ErrorMessage error={errors().adress1} />
      <InputField
        valueType="Address 2"
        value={editedMember()?.adress2}
        propertyName="adress2"
        onChange={handleChange}
      />
      <ErrorMessage error={errors().adress2} />
      <PostCodeField
        postCode={editedMember()?.postcode}
        city={editedMember()?.city}
      />
      <CountryField />
      <div class="grid">
        <button type="submit">Save</button>
        <button type="button" class="btn-red" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </>
  );
}

export default EditForm;
