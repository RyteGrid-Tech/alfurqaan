import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { alFurqaanHtml } from "@/lib/alfurqaan-page";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dr. Abdur-Raheem Adebayo Shittu — Islamic Books & Ebooks" },
      {
        name: "description",
        content:
          "Authentic Islamic guidance by Barrister (Dr.) Abdur-Raheem Adebayo Shittu. Logical insights on Faith, Shariah & the Afterlife for the modern believer.",
      },
      {
        property: "og:title",
        content: "Dr. Abdur-Raheem Adebayo Shittu — Islamic Books & Ebooks",
      },
      {
        property: "og:description",
        content:
          "Authentic Islamic guidance by Barrister (Dr.) Abdur-Raheem Adebayo Shittu. Logical insights on Faith, Shariah & the Afterlife for the modern believer.",
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
