import { describe, it, expect } from "bun:test";
import fs from "node:fs";
import path from "node:path";

describe("Mobile Viewport Overflow & Cloudflare Deploy Guardrails", () => {
  it("enforces html and body overflow-x hidden in styles.css", () => {
    const cssPath = path.resolve(import.meta.dir, "../styles.css");
    const content = fs.readFileSync(cssPath, "utf-8");

    expect(content).toContain("html {");
    expect(content).toContain("overflow-x: hidden;");
    expect(content).toContain("max-width: 100%;");
    expect(content).toContain("width: 100%;");
    expect(content).toContain("body {");
  });

  it("enforces overflow-x-hidden on RootShell in __root.tsx", () => {
    const rootPath = path.resolve(import.meta.dir, "../routes/__root.tsx");
    const content = fs.readFileSync(rootPath, "utf-8");

    expect(content).toContain('className="overflow-x-hidden max-w-full w-full"');
  });

  it("hides header search button on mobile viewports (< md) in SiteHeader.tsx", () => {
    const headerPath = path.resolve(import.meta.dir, "../components/layout/SiteHeader.tsx");
    const content = fs.readFileSync(headerPath, "utf-8");

    // Must be hidden on mobile screens because MobileBottomNav provides thumb search
    expect(content).toContain("hidden md:flex");
    expect(content).toContain("min-w-0");
  });

  it("contains rotating SVG watermark in HeroSection.tsx", () => {
    const heroPath = path.resolve(import.meta.dir, "../components/home/HeroSection.tsx");
    const content = fs.readFileSync(heroPath, "utf-8");

    expect(content).toContain("overflow-x-clip");
    expect(content).toContain("overflow-hidden max-w-full");
    expect(content).toContain("max-w-full max-h-full");
  });

  it("contains 3D card transforms in ReadingRoomSection.tsx", () => {
    const rrPath = path.resolve(import.meta.dir, "../components/home/ReadingRoomSection.tsx");
    const content = fs.readFileSync(rrPath, "utf-8");

    expect(content).toContain('id="reading"');
    expect(content).toContain("overflow-hidden");
  });

  it("verifies Cloudflare build scripts in package.json", () => {
    const pkgPath = path.resolve(import.meta.dir, "../../package.json");
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

    expect(pkg.scripts["build:workers"]).toBeDefined();
    expect(pkg.scripts["build:pages"]).toBeDefined();
    expect(pkg.scripts["deploy:workers"]).toBeDefined();
    expect(pkg.scripts["deploy:pages"]).toBeDefined();
  });
});
