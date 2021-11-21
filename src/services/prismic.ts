import Prismic from "@prismicio/client";
// import Link from 'next/link'
import { Router } from "../../prismicConfiguration";

// Helper function to convert Prismic Rich Text links to Next/Link components
// export const customLink = (type, element, content, children, index) => (
//     <Link key={index} href={linkResolver(element.data)}>
//       <a>{content}</a>
//     </Link>
// )

// -- @prismicio/client initialisation
// Initialises the Prismic Client that's used for querying the API and passes it any query options.
export const prismicClient = (req: unknown = null) =>
  Prismic.client(
    process.env.PRISMIC_ENDPOINT,
    createClientOptions(req, process.env.PRISMIC_ACCESS_TOKEN, Router)
  );

// Options to be passed to the Client
const createClientOptions = (
  req: unknown = null,
  prismicAccessToken: string = null,
  routes = null
) => {
  const reqOption = req ? { req } : {};
  const accessTokenOption = prismicAccessToken
    ? { accessToken: prismicAccessToken }
    : {};
  const routesOption = routes ? { routes: Router.routes } : {};
  return {
    ...reqOption,
    ...accessTokenOption,
    ...routesOption,
  };
};
