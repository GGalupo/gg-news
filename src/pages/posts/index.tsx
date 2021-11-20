import Head from "next/head";
import styles from "./styles.module.scss";

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | GG News</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>21 de Novembro de 2021</time>
            <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic
              atque laboriosam eos voluptatibus sed officia repellat porro,
              aspernatur dignissimos voluptas dolore nisi pariatur consectetur
              inventore vel? Eius delectus tempore reiciendis.
            </p>
          </a>
          <a href="#">
            <time>21 de Novembro de 2021</time>
            <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic
              atque laboriosam eos voluptatibus sed officia repellat porro,
              aspernatur dignissimos voluptas dolore nisi pariatur consectetur
              inventore vel? Eius delectus tempore reiciendis.
            </p>
          </a>
          <a href="#">
            <time>21 de Novembro de 2021</time>
            <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic
              atque laboriosam eos voluptatibus sed officia repellat porro,
              aspernatur dignissimos voluptas dolore nisi pariatur consectetur
              inventore vel? Eius delectus tempore reiciendis.
            </p>
          </a>
          <a href="#">
            <time>21 de Novembro de 2021</time>
            <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic
              atque laboriosam eos voluptatibus sed officia repellat porro,
              aspernatur dignissimos voluptas dolore nisi pariatur consectetur
              inventore vel? Eius delectus tempore reiciendis.
            </p>
          </a>
        </div>
      </main>
    </>
  );
}
