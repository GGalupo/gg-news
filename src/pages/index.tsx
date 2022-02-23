import Head from "next/head";
import { GetStaticProps } from "next";

import { stripe } from "../services/stripe";
import { SubscribeButton } from "../components/SubscribeButton";

import styles from "./home.module.scss";

interface HomeProps {
  formattedPrice: string;
}

export default function Home({ formattedPrice }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | GG News</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>Hey, welcome! 👋🏻</span>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get access to all the publications
            <br />
            <span>for {formattedPrice}/month.</span>
          </p>
          <SubscribeButton />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve(process.env.STRIPE_PRODUCT_PRICE);

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price.unit_amount / 100);

  return {
    props: {
      formattedPrice,
    },
    revalidate: 60 * 60 * 24, //24h
  };
};
