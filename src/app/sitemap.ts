import type { MetadataRoute } from "next";
import { siteConfig, projects } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/services", "/work", "/about", "/contact"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${siteConfig.url}/work/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}
