import { useRouteData } from "solid-start";
import { useUserRedirect } from "~/hooks/useUserRedirect";
import { Member } from "~/types";
import { useNavigate } from "solid-start";
import { For, createEffect, createSignal } from "solid-js";
import { useMemberValidation } from "~/hooks/useMemberValidation";
import { Show } from "solid-js";
import AddMemberForm from "~/components/AddMemberForm";
import { useAddMember } from "~/hooks/useAddMember";

export function routeData() {
  return useUserRedirect();
}

export const [member, setMember] = createSignal<Member | null | undefined>();
export const [errors, setErrors] = createSignal<
  Partial<Record<keyof Member, string>>
>({});

function addNewMember() {
  const user = useRouteData<typeof routeData>();
  const navigate = useNavigate();
  const [result, setResult] = createSignal<Member | null | undefined>();
  const { submittingMember, Form } = useAddMember();

  createEffect(() => {
    const newErrors = useMemberValidation(member());
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
            <AddMemberForm />
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

export default addNewMember;
