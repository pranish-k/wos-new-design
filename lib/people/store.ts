// The read side of the people store, which is all any page needs.
//
// Writes live in store.write.ts and are used only by the dev-only admin. They are split
// so the page graph never pulls in sharp or the fs write path.

export { listPeople, listAllPeople, getPerson, listGroups, getGroup, PEOPLE_DIR } from "./store.fs";
export type { Group, GroupId, PersonRecord, BioBlock } from "./types";
export { personHref, comparePeople } from "./types";
