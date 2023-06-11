// editMember.tsx

import { useRouteData } from "solid-start";
import { selectedMember } from "./searchMembers";
import { useUserRedirect } from "~/hooks/useUserRedirect";
import Nav from "~/components/Nav";
import { Member } from "~/types";
import { useNavigate } from "solid-start";
import { For, createEffect, createSignal } from "solid-js";
import { useUpdateMemberFull } from "~/hooks/useUpdateMemberFull";
import { useUpdateMemberLimited } from "~/hooks/useUpdateMemberLimited";
import { useMemberValidation } from "~/hooks/useMemberValidation";
import { Show } from "solid-js";
import EditForm from "~/components/EditForm";
import { useUserPermissions } from "~/components/userPermissionsContext";
import { useCheckUpdatePermissions } from "~/hooks/useCheckUpdatePermissions";

export function routeData() {
  return useUserRedirect();
}

export const [editedMember, setEditedMember] = createSignal(selectedMember());
export const [errors, setErrors] = createSignal<
  Partial<Record<keyof Member, string>>
>({});

function editmember() {
  const user = useRouteData<typeof routeData>();
  const navigate = useNavigate();
  const { userPermissions, setUserPermissions } = useUserPermissions();
  const [result, setResult] = createSignal<Member | null | undefined>();
  const { submittingMember, Form } = useCheckUpdatePermissions();

  setEditedMember(selectedMember());
  
  createEffect(() => {
    setUserPermissions(user()?.groups ?? []);
  });

  if (editedMember() === undefined) {
    navigate("/searchmembers");
  }

  createEffect(() => {
    const newErrors = useMemberValidation(editedMember());
    setErrors(newErrors);
  });

  createEffect(() => {
    if (result()) {
      navigate("/MemberReciept", { state: { member: result() } });
    }
  });

  createEffect(() => {
    if (submittingMember.result) {
      setResult(submittingMember.result);
    }
  });

  return (
    <>
      <div class="container">
        <article>
          <Form>
            <EditForm user={user()} />
          </Form>
          <div class="errors">
            <Show
              when={
                submittingMember.error && !submittingMember.error.fieldErrors
              }
            >
              <p>{submittingMember.error.message}</p>
            </Show>
          </div>
        </article>
      </div>
    </>
  );
}

export default editmember;
