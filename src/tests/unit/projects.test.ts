import { describe, it, expect } from "vitest";
import { projects } from "../../data/projects";

describe("projects data", () => {
  it("should have at least one project", () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it("each project should have required fields", () => {
    projects.forEach((project) => {
      expect(project.id).toBeDefined();
      expect(project.title.en).toBeDefined();
      expect(project.title.es).toBeDefined();
      expect(project.stack).toBeInstanceOf(Array);
      expect(project.stack.length).toBeGreaterThan(0);
      expect(["live", "freelance", "personal"]).toContain(project.status);
    });
  });

  it("project highlights should be arrays with at least 2 items", () => {
    projects.forEach((project) => {
      expect(project.highlights.en.length).toBeGreaterThanOrEqual(2);
      expect(project.highlights.es.length).toBeGreaterThanOrEqual(2);
    });
  });

  it("each project should have valid status", () => {
    const validStatuses = ["live", "freelance", "personal"];
    projects.forEach((project) => {
      expect(validStatuses).toContain(project.status);
    });
  });

  it("each project should have category array", () => {
    projects.forEach((project) => {
      expect(project.category).toBeInstanceOf(Array);
      expect(project.category.length).toBeGreaterThan(0);
    });
  });
});
