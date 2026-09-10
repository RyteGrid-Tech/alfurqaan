import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { alFurqaanHtml } from "@/lib/alfurqaan-page";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Al Furqaan Publishers — Islamic Books & Ebooks" },
      {
        name: "description",
        content:
          "Al Furqaan Publishers Ltd — authentic Islamic literature. Buy beautiful print editions or instant ebooks.",
      },
      {
        property: "og:title",
        content: "Al Furqaan Publishers — Islamic Books & Ebooks",
      },
      {
        property: "og:description",
        content:
          "Authentic Islamic classics and contemporary scholarship — hand-finished print editions and instant ebooks.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    const s = document.createElement("script");
    s.src = "/alfurqaan.js";
    document.body.appendChild(s);
    return () => {
      s.remove();
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: alFurqaanHtml }} />;
}
