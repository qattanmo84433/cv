import { Badge } from "../../components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
import { Section } from "../../components/ui/section";
import { RESUME_DATA } from "../../data/resume-data";
import { twMerge } from "tailwind-merge";
type ProjectTags = readonly string[];

interface ProjectLinkProps {
  title: string;
  link?: string;
}

/**
 * Renders project title with optional link and status indicator
 */
function ProjectLink({ title, link }: ProjectLinkProps) {
  if (!link) {
    return <span>{title}</span>;
  }

  return (
    <>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 hover:underline"
        aria-label={`${title} project (opens in new tab)`}
      >
        {title}
        <span
          className="size-1 rounded-full bg-green-500"
          aria-label="Active project indicator"
        />
      </a>
      <div
        className="hidden font-mono text-xs underline print:visible"
        aria-hidden="true"
      >
        {link.replace("https://", "").replace("www.", "").replace("/", "")}
      </div>
    </>
  );
}

interface ProjectTagsProps {
  tags: ProjectTags;
}

/**
 * Renders a list of technology tags used in the project
 */
function ProjectTags({ tags }: ProjectTagsProps) {
  if (tags.length === 0) return null;

  return (
    <ul
      className="mt-2 flex list-none flex-wrap gap-1 p-0"
      aria-label="Technologies used"
    >
      {tags.map((tag) => (
        <li key={tag}>
          <Badge
            className={twMerge(
              "print:text-[10px] transition-transform duration-200 hover:scale-110 hover:shadow-md",              
            )}
            aria-label={`tag: ${tag}`}
            label={tag}
          >
          </Badge>
        </li>
      ))}
    </ul>
  );
}

interface ProjectCardProps {
  title: string;
  description: string;
  tags: ProjectTags;
  link?: string;
}

/**
 * Card component displaying project information
 */
function ProjectCard({ title, description, tags, link }: ProjectCardProps) {
  return (
    <Card
      className="flex h-full flex-col overflow-hidden border p-3"
      role="article"
    >
      <CardHeader>
        <div className="space-y-1">
          <CardTitle className="text-base">
            <ProjectLink title={title} link={link} />
          </CardTitle>
          <CardDescription
            className="text-pretty font-mono text-xs print:text-[10px]"
            aria-label="Project description"
          >
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex">
        <ProjectTags tags={tags} />
      </CardContent>
    </Card>
  );
}

interface ProjectsProps {
  projects: (typeof RESUME_DATA)["projects"];
}

/**
 * Section component displaying all side projects
 */
export function Projects({ projects }: ProjectsProps) {
  return (
    <Section className="py-12 bg-gray-50">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center" id="side-projects">
        Side Projects
      </h2>
      <div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        role="feed"
        aria-labelledby="side-projects"
      >
        {projects.map((project) => (
          <article
            key={project.title}
            className="h-full"
          >
            <Card
              className="flex h-full flex-col overflow-hidden rounded-lg border bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
              role="article"
            >
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800 hover:text-blue-600 transition-colors">
                  <ProjectLink title={project.title} link={project.link?.href} />
                </CardTitle>
                <CardDescription className="mt-2 text-sm text-gray-600">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <ul
                  className="flex flex-wrap gap-2 mt-4"
                  aria-label="Technologies used"
                >
                  {project.techStack.map((tag) => (
                    <li key={tag}>
                      <Badge
                        className="bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-xs font-medium shadow hover:bg-gray-200 hover:scale-105 transition-transform"
                        label={tag}
                      />
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </article>
        ))}
      </div>
    </Section>
  );
}
