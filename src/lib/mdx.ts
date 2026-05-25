import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";

export interface ProjectMetadata {
  title: string;
  description: string;
  tags: string[];
  date: string;
  imageUrl: string;
  category: string;
  href: string;
  slug: string;
  githubUrl?: string;
  excerpt?: string;
  readTime?: string;
}

const contentDir = path.join(process.cwd(), "src/content/library");

export async function getAllSlugs(): Promise<string[]> {
  try {
    const files = await fs.readdir(contentDir);
    return files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(".mdx", ""));
  } catch (error) {
    return [];
  }
}

export async function getProjectBySlug(slug: string) {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    const metadata = {
      slug,
      href: `/library/${slug}`,
      githubUrl: data.githubUrl || null,
      ...data,
      description: data.description || data.excerpt || "", 
    };

    return {
      metadata,
      content,
    };
  } catch (error) {
    return null;
  }
}

export async function getAllProjects(): Promise<ProjectMetadata[]> {
  const slugs = await getAllSlugs();
  
  const projects = await Promise.all(
    slugs.map(async (slug) => {
      const project = await getProjectBySlug(slug);
      return project ? project.metadata : null;
    })
  );

  return projects
    .filter((p): p is any => p !== null)
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });
}
