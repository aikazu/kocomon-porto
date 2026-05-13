import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { portfolioData } from "../data/content";
import React from "react";

vi.mock("@/components/3d/GeometricScene", () => ({
	default: () => <div data-testid="geometric-scene" />,
}));

vi.mock("@vercel/speed-insights/react", () => ({
	SpeedInsights: () => null,
}));

vi.mock("@studio-freight/lenis", () => ({
	default: class {
		raf() {}
		destroy() {}
	},
}));

vi.mock("@react-three/fiber", () => ({
	Canvas: ({ children }: { children: React.ReactNode }) => (
		<div>{children}</div>
	),
	useFrame: vi.fn(),
	useThree: () => ({
		viewport: { width: 100, height: 100 },
		mouse: { x: 0, y: 0 },
	}),
}));

describe("App Component", () => {
	it("renders the main portfolio name", () => {
		render(<App />);
		expect(screen.getByLabelText(/Iqbal Attila/i)).toBeInTheDocument();
	});
});

describe("Portfolio Data", () => {
	it("has valid profile information", () => {
		expect(portfolioData.profile.name).toBe("Iqbal Attila");
		expect(portfolioData.profile.contact.email).toBeDefined();
	});

	it("contains skills categories", () => {
		expect(portfolioData.skills.length).toBeGreaterThan(0);
		expect(portfolioData.skills[0].title).toBeDefined();
	});

	it("contains experience entries", () => {
		expect(portfolioData.experience.length).toBeGreaterThan(0);
	});
});
