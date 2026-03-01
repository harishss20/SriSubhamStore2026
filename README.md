# subham2026

## Authentication & User Flow

This project uses MongoDB (Atlas) for user storage and provides a modern
authentication flow. Key features:

- Signup with **email** & **password** plus optional **name**, **mobile**, and a
  JSON-formatted **address**.
- Passwords hashed using `bcryptjs`.
- JWT stored in a secure httpOnly cookie, containing `userId` and `email`.
- `/profile` page lets users view/edit name, mobile and manage multiple
  addresses (CRUD).
- `/cart/checkout` pre-fills saved contact/address data; user may edit or enter
  a new address. The selected address is saved in the resulting order.
- Orders are stored in MongoDB with a snapshot of the shipping address.

**API routes** added:

```
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/session
PATCH /api/auth/profile    (also handles address add/edit/remove)
POST /api/checkout
GET  /api/order/:id
```

**Required environment variables** in `.env.local`:

```
MONGODB_URI=your_connection_string  # e.g. mongodb+srv://user:password@cluster.mongodb.net/dbname
                                     # make sure to replace any `<placeholders>`
AUTH_SECRET=a_long_secret_for_jwt
```

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
