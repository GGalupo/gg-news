
# GG News

GG News is a project which delivers the best news about ReactJS world.

To read full articles, the user must be authenticated (GitHub auth) and have an active subscription, which is paid with Stripe checkout.
The user and subscription data are saved on FaunaDB. The server-side code to handle this process have been made on Next.js API routes.

Fake subscription data:

`Card number: 4242 4242 4242 4242`

`Expiration date: 12/34 (must be some valid future date - MM/YY)`

`CVC: 123 (any three digit)`

For the other form fields, any value can be used.

## 🎉 Live project

https://gg-news.vercel.app/

## 💻  Demo

In progress

## 🛠️ Tech Stack

 - Next.js
 - React JS
 - TypeScript
 - Jest/React Testing Library
 - Next-auth (GitHub authentication)
 - SASS
 - Axios
 - Prismic CMS
 - FaunaDB
 - Stripe (Payments)
 
