import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { alFurqaanHtml } from "@/lib/alfurqaan-page";
import pathToParadise from "@/assets/path-to-paradise.jpg.asset.json";
import islamAndChristianity from "@/assets/islam-and-christianity.jpg.asset.json";
import quranicParables from "@/assets/quranic-parables.jpg.asset.json";
import modernIntroduction from "@/assets/modern-introduction-to-islam.jpg.asset.json";
import whatIsSunnah from "@/assets/what-is-sunnah.jpg.asset.json";
import critiqueTijaniyyah from "@/assets/critique-tijaniyyah.jpg.asset.json";

const COVERS: Record<string, string> = {
  "path-to-paradise": pathToParadise.url,
  "islam-christianity-why-conflict": islamAndChristianity.url,
  "a-book-of-quranic-parables": quranicParables.url,
  "a-modern-introduction-to-islam": modernIntroduction.url,
  "what-is-sunnah-what-is-bidah": whatIsSunnah.url,
  "critique-tijaniyyah-handbook": critiqueTijaniyyah.url,
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Al Furqaan Publishers — Islamic Books & Ebooks by Dr. A. A. Shittu" },
      {
        name: "description",
        content:
          "Al Furqaan Publishers — authentic Islamic books & ebooks by Barrister (Dr.) Abdur-Raheem Adebayo Shittu. Logical insights on Faith, Shariah & the Afterlife for the modern believer.",
      },
      {
        property: "og:title",
        content: "Al Furqaan Publishers — Islamic Books & Ebooks by Dr. A. A. Shittu",
      },
      {
        property: "og:description",
        content:
          "Al Furqaan Publishers — authentic Islamic books & ebooks by Barrister (Dr.) Abdur-Raheem Adebayo Shittu. Logical insights on Faith, Shariah & the Afterlife for the modern believer.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    const seed = document.createElement("script");
    seed.textContent = "window.AF_COVERS=" + JSON.stringify(COVERS) + ";";
    const s = document.createElement("script");
    s.src = "/alfurqaan.js";
    document.body.appendChild(seed);
    document.body.appendChild(s);
    return () => {
      seed.remove();
      s.remove();
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: alFurqaanHtml }} />;
}
