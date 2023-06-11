import { Member } from "~/types";
import { createSignal } from "solid-js";
import { setSelectedMember } from "~/routes/searchMembers";



type MemberRowProps = {
    member: Member;
};

function MemberRow(props: MemberRowProps) {

    return (
        <>
            <tr
                class="hover-row  row"
                onClick={() => setSelectedMember(props.member)}
            >
                <td>{props.member.name}</td>
                <td>{props.member.m_id}</td>
            </tr>
        </>
    );
}

export default MemberRow;
