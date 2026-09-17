import type { MetadataRoute } from "next";
import { ALL_ACUPOINTS } from "@/data/tsubo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.haritaro.jp";
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/curriculum`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/diagnosis`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/simulator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tsubo`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tsubo/compare`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tsubo/practice`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tsubo/basics/bone-cun`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/symptoms`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const acupointPages: MetadataRoute.Sitemap = ALL_ACUPOINTS.map((pt) => {
    const isFlagship = ["LI4", "PC6", "ST36"].includes(pt.code);
    return {
      url: `${baseUrl}/tsubo/${pt.code.toLowerCase()}`,
      lastModified,
      changeFrequency: "weekly",
      priority: isFlagship ? 0.85 : pt.hasDetailedAnatomy ? 0.75 : 0.7,
    };
  });

  return [...staticPages, ...acupointPages];
}
