import { createEffect, createSignal, For } from "solid-js";
import { useRouteData } from "solid-start";
import { useUserRedirect } from "~/hooks/useUserRedirect";
import { useSearchMembers } from "~/hooks/useSearchMembers";
import SelectedMemberDisplay from "~/components/SelectedMemberDisplay";
import MemberRow from "~/components/MemberRow";
import type { Member } from "~/types";

export const [selectedMember, setSelectedMember] = createSignal<
  Member | undefined
>(undefined);

export function routeData() {
  return useUserRedirect();
}

function SearchMembers() {
  const user = useRouteData<typeof routeData>();

  const [searchInput, setSearchInput] = createSignal("");
  const members = useSearchMembers(searchInput);

  const handleSearchInput = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    setSearchInput(value);
  };

  return (
    <>
      <div class="container">
        <h1>Search Members</h1>
        <p>John Doe is the only member 😅</p>
        <div class="grid">
          <input
            name="search"
            type="text"
            placeholder="Search for a member"
            onInput={handleSearchInput}
            autofocus
          />
        </div>
        <div class="grid">
          <div class="container">
            <table class="container searchResult">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Member ID</th>
                </tr>
              </thead>
              <tbody>
                <For each={members()?.slice(0, 10)}>
                  {(member) => <MemberRow member={member} />}
                </For>
              </tbody>
            </table>
            <div></div>
          </div>
          <SelectedMemberDisplay user={user} />
        </div>
      </div>
    </>
  );
}

export default SearchMembers;
