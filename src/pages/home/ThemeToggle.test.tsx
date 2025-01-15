import { test, vi, expect } from "vitest";
import ThemeToggle from "./ThemeToggle";
import { fireEvent, render, screen } from "@testing-library/react";
import useThemeStore from "../../stores/useThemeStore";

vi.mock("../../stores/useThemeStore", () => ({
  default: vi.fn(() => ({
    theme: "light",
    setTheme: vi.fn(),
  })),
}));

test("버튼 클릭시 테마가 변경되는가", () => {
  const mockSetTheme = vi.fn();
  (useThemeStore as any).mockImplementation(() => ({
    theme: "light",
    setTheme: mockSetTheme,
  }));

  render(<ThemeToggle />);
  const button = screen.getByTestId("theme-btn");
  fireEvent.click(button);

  expect(mockSetTheme).toHaveBeenCalledWith("dark");
});
