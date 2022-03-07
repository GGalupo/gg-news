import { screen, render } from "@testing-library/react";
import { mocked } from "jest-mock";
import { getSession } from "next-auth/client";

import Post, { getServerSideProps } from "../../pages/posts/[slug]";
import { prismicClient } from "../../services/prismic";

const post = {
  slug: "test-slug",
  title: "Test title",
  content: "<p>Test content</p>",
  updatedAt: "02 de Janeiro de 2022",
};

jest.mock("next-auth/client");
jest.mock("../../services/prismic");

describe("Post page", () => {
  it("should render correctly", () => {
    render(<Post post={post} />);

    expect(screen.getByText("Test title")).toBeInTheDocument();
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("should redirect user to home if there's no active subscription", async () => {
    const getSessionMocked = mocked(getSession);

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: null,
    });

    const response = await getServerSideProps({
      params: {
        slug: "test-slug",
      },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: "/",
        }),
      })
    );
  });

  it("should get post info from getServerSideProps", async () => {
    const getSessionMocked = mocked(getSession);
    const prismicClientMocked = mocked(prismicClient);

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: "test-active-subscription",
    });
    prismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [{ type: "heading", text: "Test title" }],
          content: [{ type: "paragraph", text: "Test content" }],
        },
        last_publication_date: "01-02-2022",
      }),
    } as any);

    const response = await getServerSideProps({
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
