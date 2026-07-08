import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TOOLS, getTool } from "@/lib/tools";
import { SITE_NAME } from "@/lib/site";
import ToolPageLayout from "@/components/ToolPageLayout";
import RdwTool from "@/components/RdwTool";
import MrbTool from "@/components/MrbTool";

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const tool = getTool(params.slug);
  if (!tool) return { title: "Gratis kentekentools" };
  return {
    title: tool.title,
    description: tool.description,
    alternates: { canonical: `/tools/${tool.slug}` },
    openGraph: { title: `${tool.title} — ${SITE_NAME}`, description: tool.description, type: "website" },
  };
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = getTool(params.slug);
  if (!tool) notFound();

  return (
    <ToolPageLayout tool={tool}>
      {tool.variant === "mrb" ? <MrbTool /> : <RdwTool variant={tool.variant} />}
    </ToolPageLayout>
  );
}
