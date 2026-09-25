import { redirect } from "next/navigation";

export default function MyNoteRedirectPage() {
  redirect("/notes");
}
