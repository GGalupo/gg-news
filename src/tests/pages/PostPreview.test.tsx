import { screen, render } from "@testing-library/react";
import { mocked } from "jest-mock";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

import { prismicClient } from "../../services/prismic";
import Post, { getStaticProps } from "../../pages/posts/preview/[slug]";

const post = {
  slug: "test-slug",
  title: "Test title",
  content: "<p>Test content</p>",
  updatedAt: "02 de Janeiro de 2022",
};

jest.mock("../../services/prismic");
jest.mock("next-auth/client");
jest.mock("next/router");

describe("Post preview page", () => {
  it("should render correctly", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([
      {
        activeSubscription: false,
      },
    ] as any);

    render(<Post post={post} />);

    expect(screen.getByText("Test title")).toBeInTheDocument();
    expect(screen.getByText("Test content")).toBeInTheDocument();
    expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument();
  });

  it("should redirect user to post if there's an active subscription", async () => {
    const useSessionMocked = mocked(useSession);
    const useRouterMocked = mocked(useRouter);
    const pushMocked = jest.fn();

    useSessionMocked.mockReturnValueOnce([
      {
        activeSubscription: "test-active-subscription",
      },
    ] as any);
    useRouterMocked.mockReturnValueOnce({
      push: pushMocked,
    } as any);

    render(<Post post={post} />);

    expect(pushMocked).toHaveBeenCalledWith("/posts/test-slug");
  });

  it("should get post info from getStaticProps", async () => {
    const prismicClientMocked = mocked(prismicClient);

    prismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [{ type: "heading", text: "Test title" }],
          content: [{ type: "paragraph", text: "Test content" }],
        },
        last_publication_date: "01-02-2022",
      }),
    } as any);

    const response = await getStaticProps({
      params: {
        slug: "test-slug",
      },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: "test-slug",
            title: "Test title",
            content: "<p>Test content</p>",
            updatedAt: "02 de janeiro de 2022",
          },
        },
      })
    );
  });
});
