//useSearchMembers.ts
import { createEffect, createSignal } from "solid-js";
import { setSelectedMember } from "~/routes/searchMembers";
import { DummyDatabaseInstance } from "~/serverSide/services/services";
import { Member } from "~/types";
import { createServerAction$ } from "solid-start/server";

export function useSearchMembers(searchInput: () => string) {
  const [members, setMembers] = createSignal<Member[]>([]);
  const [searching, Results] = createServerAction$(
    async (searchInput: string) => {
      const results: Member[] = await DummyDatabaseInstance.searchName(
        searchInput
      );
      return results;
    }
  );

  createEffect(() => {
    const input = searchInput();
    if (input.trim() === "") {
      setMembers([]);
      setSelectedMember(undefined); // Add this line to reset the selected member
    } else {
      Results(input).then((results) => {
        setMembers(results);
        setSelectedMember(results[0]);
      });
    }
  });

  return members;
}
