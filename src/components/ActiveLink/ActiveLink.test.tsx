import { render, screen } from "@testing-library/react";

import { ActiveLink } from ".";

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/",
      };
    },
  };
});

describe("ActiveLink component", () => {
  it("should render correctly", () => {
    render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("should have active class when path is equal to href", () => {
    render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    );

    expect(screen.getByText("Home")).toHaveClass("active");
  });

  it("should not have active class when path and href are different", () => {
    render(
      <ActiveLink href="/test" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    );

    expect(screen.getByText("Home")).not.toHaveClass("active");
  });
});
