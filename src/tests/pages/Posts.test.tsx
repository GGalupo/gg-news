import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";

import Posts from "../../pages/posts";
import { getStaticProps } from "../../pages/posts";
import { prismicClient } from "../../services/prismic";

const posts = [
  {
    slug: "test-post-1",
    title: "Test post 1",
    excerpt: "Post for testing purposes",
    updatedAt: "02 de Janeiro de 2022",
  },
];

jest.mock("../../services/prismic");

describe("Posts page", () => {
  it("should render correctly", () => {
    render(<Posts posts={posts} />);

    expect(screen.getByText("Test post 1")).toBeInTheDocument();
  });

  it("should get posts info from getStaticProps", async () => {
    const prismicClientMocked = mocked(prismicClient);

    prismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: "my-post-uid",
            data: {
              title: [{ type: "heading", text: "My post title" }],
              content: [{ type: "paragraph", text: "My post excerpt" }],
            },
            last_publication_date: "02-01-2022",
          },
        ],
      }),
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: "my-post-uid",
              title: "My post title",
              excerpt: "My post excerpt",
              updatedAt: "01 de fevereiro de 2022",
            },
          ],
        },
      })
    );
  });
});
