import { getAllProjects } from "@/lib/mdx";
import LibraryPageClient from "./LibraryClient";

export default async function LibraryPage() {
  const projects = await getAllProjects();
  
  return <LibraryPageClient initialProjects={projects} />;
}
