import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";

import { stripe } from "../../services/stripe";
import Home, { getStaticProps } from "../../pages";

jest.mock("next/router");
jest.mock("next-auth/react", () => {
  return {
    useSession: () => {
      return { data: null, status: "unauthenticated" };
    },
  };
});
jest.mock("../../services/stripe");

describe("Home page", () => {
  it("should render correctly", () => {
    render(<Home formattedPrice="$20.00" />);

    expect(screen.getByText("for $20.00/month.")).toBeInTheDocument();
  });

  it("should get formatted stripe price from getStaticProps", async () => {
    const retrieveStripePriceMocked = mocked(stripe.prices.retrieve);

    retrieveStripePriceMocked.mockResolvedValueOnce({
      unit_amount: 2000,
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          formattedPrice: "$20.00",
        },
      })
    );
  });
});
