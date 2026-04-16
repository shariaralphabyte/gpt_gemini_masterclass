import { notFound } from "next/navigation";
import LessonPlayer from "@/components/LessonPlayer";
import manifest from "@/data/course_manifest.json";
import fs from "fs";
import path from "path";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const allLessons = manifest.weeks.flatMap((w) => w.lessons);
  return allLessons.map((l) => ({ slug: l.slug }));
}

async function getLessonData(slug: string) {
  const allLessons = manifest.weeks.flatMap((w) => w.lessons);
  const lessonEntry = allLessons.find((l) => l.slug === slug);

  if (!lessonEntry) return null;

  try {
    const filePath = path.join(process.cwd(), "src/data/lessons", lessonEntry.slug + ".json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    return {
      lesson: JSON.parse(fileContents),
      entry: lessonEntry,
    };
  } catch (error) {
    console.error("Error loading lesson:", error);
    return null;
  }
}

export default async function LessonPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getLessonData(slug);

  if (!data) {
    notFound();
  }

  // Calculate Navigation
  const allLessons = manifest.weeks.flatMap((w) => w.lessons);
  const currentIndex = allLessons.findIndex((l) => l.slug === slug);
  const prev = currentIndex > 0 ? allLessons[currentIndex - 1] : undefined;
  const next = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : undefined;

  return (
    <LessonPlayer 
      lesson={data.lesson} 
      navigation={{
        prev: prev ? { slug: prev.slug, title: prev.title } : undefined,
        next: next ? { slug: next.slug, title: next.title } : undefined
      }}
    />
  );
}
