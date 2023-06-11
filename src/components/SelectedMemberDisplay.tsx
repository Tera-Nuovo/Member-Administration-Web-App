import MemberInfoLine from "~/components/MemberInfoLine";
import { Show } from "solid-js/web";
import { useNavigate } from "solid-start";
import { selectedMember } from "~/routes/searchMembers";
import { useCanEditLimited } from "~/hooks/useCanEditLimited";
import { User } from "~/types";

type Props = {
  user: () => User | undefined;
};

function SelectedMemberDisplay({ user }: Props) {
  const navigate = useNavigate();
  const canEditLimited = useCanEditLimited;

  return (
    <>
      <article>
        <Show when={selectedMember()?.name}>
          <MemberInfoLine valueType="Name:" value={selectedMember()?.name} />
        </Show>
        <Show when={!selectedMember()?.name}>
          <MemberInfoLine valueType="Name:" value="" />
        </Show>
        <MemberInfoLine
          valueType="Member-ID:"
          value={selectedMember()?.m_id ?? ""}
        />
        <MemberInfoLine
          valueType="Email:"
          value={selectedMember()?.mail ?? ""}
        />
        <MemberInfoLine
          valueType="Phone:"
          value={selectedMember()?.phone ?? ""}
        />
        <MemberInfoLine
          valueType="Address 1:"
          value={selectedMember()?.adress1 ?? ""}
        />
        <MemberInfoLine
          valueType="Address 2"
          value={selectedMember()?.adress2 ?? ""}
        />
        <MemberInfoLine
          valueType="Postal Code:"
          value={selectedMember()?.postcode ?? ""}
        />
        <MemberInfoLine
          valueType="City:"
          value={selectedMember()?.city ?? ""}
        />
        <MemberInfoLine
          valueType="Country:"
          value={selectedMember()?.country ?? ""}
        />
        <MemberInfoLine
          valueType="Created:"
          value={selectedMember()?.created ?? ""}
        />
        <Show
          when={
            selectedMember() &&
            (canEditLimited() ||
              selectedMember()?.m_id === Number(user()?.m_id))
          }
        >
          <button
            class="btn btn-primary"
            onClick={() => navigate("/editmember")}
          >
            Edit
          </button>
        </Show>
      </article>
    </>
  );
}

export default SelectedMemberDisplay;
