import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";
import { RESUME_DATA } from "@/data/resume-data";
import { cn } from "@/lib/utils";
import { twMerge } from "tailwind-merge";
type Skills = readonly string[];

interface SkillsListProps {
  skills: Skills;
  className?: string;
}

/**
 * Renders a list of skills as badges
 */
function SkillsList({ skills, className }: SkillsListProps) {
  const colors = [
    "bg-blue-100 text-blue-800",
    "bg-green-100 text-green-800",
    "bg-yellow-100 text-yellow-800",
    "bg-red-100 text-red-800",
    "bg-purple-100 text-purple-800",
  ];

  return (
    <ul
      className={twMerge("flex list-none flex-wrap gap-1 p-0", className)}
      aria-label="List of skills"
    >
    {skills.map((skill, index) => (
        <li key={skill}>
          <Badge
            className={twMerge(
              "print:text-[10px] transition-transform duration-200 hover:scale-110 hover:shadow-md",              
              colors[index % colors.length]
            )}
            aria-label={`Skill: ${skill}`}
            label={skill}
          >
          </Badge>
        </li>
      ))}
    </ul>
  );
}

interface SkillsProps {
  skills: Skills;
  className?: string;
}

/**
 * Skills section component
 * Displays a list of professional skills as badges
 */
export function Skills({ skills, className }: SkillsProps) {
  return (
    <Section className={className}>
      <h2 className="text-xl font-bold" id="skills-section">
        Skills
      </h2>
      <SkillsList skills={skills} aria-labelledby="skills-section" />
    </Section>
  );
}
