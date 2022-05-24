import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import { useSession } from "next-auth/react";

import { type useSessionMockedReturn } from "../../tests";

import { SignInButton } from ".";

jest.mock("next-auth/react");

describe("SignInButton component", () => {
  it("should render correctly when user is not logged in", () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    } as useSessionMockedReturn);

    render(<SignInButton />);

    expect(screen.getByText("Sign in with GitHub")).toBeInTheDocument();
  });

  it("should render correctly when user is logged in", () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: "John Doe",
        },
      },
      status: "authenticated",
    } as useSessionMockedReturn);
    render(<SignInButton />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
});
