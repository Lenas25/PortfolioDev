import { describe, it, expect } from "vitest";
import { translations } from "../../data/i18n";

describe("i18n translations", () => {
  it("should have both ES and EN translations", () => {
    expect(translations.es).toBeDefined();
    expect(translations.en).toBeDefined();
  });

  it("should have all required sections in both languages", () => {
    const sections = [
      "nav",
      "hero",
      "about",
      "skills",
      "projects",
      "experience",
      "toolbox",
      "contact",
      "footer",
    ];
    sections.forEach((section) => {
      expect(
        translations.es[section as keyof typeof translations.es],
      ).toBeDefined();
      expect(
        translations.en[section as keyof typeof translations.en],
      ).toBeDefined();
    });
  });

  it("should have same keys in ES and EN for hero section", () => {
    const esKeys = Object.keys(translations.es.hero).sort();
    const enKeys = Object.keys(translations.en.hero).sort();
    expect(esKeys).toEqual(enKeys);
  });

  it("should have required fields in nav section", () => {
    const requiredNavFields = ["about", "skills", "projects", "experience", "contact", "hire", "downloadCV"];
    requiredNavFields.forEach((field) => {
      expect(translations.es.nav[field as keyof typeof translations.es.nav]).toBeDefined();
      expect(translations.en.nav[field as keyof typeof translations.en.nav]).toBeDefined();
    });
  });
});
