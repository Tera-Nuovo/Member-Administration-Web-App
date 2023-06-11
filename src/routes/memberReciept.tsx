import { useRouteData } from "solid-start";
import { useUserRedirect } from "~/hooks/useUserRedirect";
import type { Member } from "~/types";
import { useLocation } from "solid-start";
import { Show } from "solid-js/web";
import MemberInfoLine from "~/components/MemberInfoLine";
import { useNavigate } from "solid-start";

interface RouteState {
  member?: Member;
}

export function routeData() {
  return useUserRedirect();
}

function MemberReciept() {
  const navigate = useNavigate();
  const user = useRouteData<typeof routeData>();
  const location = useLocation();
  const state = location.state as RouteState;
  const member = state.member;

  return (
    <>
      <div class="container">
        <h1>Reciept</h1>
        <article>
          <Show when={member?.name}>
            <MemberInfoLine valueType="Name:" value={member?.name} />
          </Show>
          <Show when={!member?.name}>
            <MemberInfoLine valueType="Name:" value="" />
          </Show>
          <MemberInfoLine valueType="Member ID:" value={member?.m_id ?? ""} />
          <MemberInfoLine valueType="Email:" value={member?.mail ?? ""} />
          <MemberInfoLine valueType="Phone:" value={member?.phone ?? ""} />
          <MemberInfoLine
            valueType="Address 1:"
            value={member?.adress1 ?? ""}
          />
          <MemberInfoLine valueType="Address 2" value={member?.adress2 ?? ""} />
          <MemberInfoLine
            valueType="Postal Code:"
            value={member?.postcode ?? ""}
          />
          <MemberInfoLine valueType="City:" value={member?.city ?? ""} />
          <MemberInfoLine valueType="Country:" value={member?.country ?? ""} />
          <MemberInfoLine valueType="Created:" value={member?.created ?? ""} />
        </article>
        <button
          class="btn btn-primary"
          onClick={() => navigate("/searchmembers")}
        >
          Back
        </button>
      </div>
    </>
  );
}

export default MemberReciept;
