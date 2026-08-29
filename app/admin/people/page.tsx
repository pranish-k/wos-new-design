import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PeopleAdmin from "@/components/admin/PeopleAdmin";
import { listAllPeople, listGroups } from "@/lib/people/store";

// Development only, and deliberately not linked from anywhere on the site.
//
// This is a local editing convenience, not an authenticated admin. It writes to the
// repo, so publishing is a commit and every change lands in git history with an author.
export const metadata: Metadata = { title: "People", robots: { index: false, follow: false } };

export default function Page() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <PeopleAdmin people={listAllPeople()} groups={listGroups()} />;
}
