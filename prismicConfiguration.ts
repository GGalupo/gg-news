// -- Prismic API endpoint
export const apiEndpoint = process.env.PRISMIC_ENDPOINT;

// -- Access Token if the repository is not public
// Generate a token in your dashboard and configure it here if your repository is private
export const accessToken = process.env.PRISMIC_ACCESS_TOKEN;

// -- Link resolution rules
// Manages the url links to internal Prismic documents
export const linkResolver = (doc: any) => {
  if (doc.type === "page") {
    return `/${doc.uid}`;
  }
  return "/";
};

// -- Route Resolver rules
// Manages the url links to internal Prismic documents two levels deep (optionals)
export const Router = {
  routes: [
    {
      type: "publication",
      path: "/:uid",
    },
  ],
};
