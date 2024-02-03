## Real-Time Messenger Clone: Next.js 14, React, Tailwind, Prisma, MongoDB, NextAuth, OAuth, Pusher

This is a repository for a Real-Time Messenger Clone built with Next.js 14, React, Tailwind, Prisma, MongoDB, NextAuth, OAuth and Pusher. The foundation of this application's implementation was guided by [Antonio Erdeljac's Messenger Clone tutorial](https://github.com/AntonioErdeljac/next13-messenger).

Key features:

- Real-time messaging, user status and read receipts via [Pusher](https://pusher.com/)
- Message attachments and file sharing
- File and Image upload via [Cloudinary CDN](https://cloudinary.com/)
- Group chat or one-on-one messaging
- Online/offline user statuses
- User profile and customization and settings
- Tailwind design for sleek UI
- Tailwind animations and transition effects
- Full responsiveness for all device sizes
- Credential authentication with [NextAuth](https://next-auth.js.org/)
- Google and GitHub authentication integration (OAuth)
- Server error handling with [react-hot-toast](https://react-hot-toast.com/) notifications

Additional features (originally implemented):

- Updated and support for [Next.js 14 (App Router)](https://nextjs.org/docs/app) development
- Client-sided message searching
- Added API routing for messages/conversation client-server interactions
- Fixed message rendering to support more edge cases
- Improved Profile drawer information display for group chats

### Cloning the repository

```shell
git clone https://github.com/Trieuh2/messenger-clone.git
```

### Install packages

```shell
npm i
```

### Setup .env file

Create a .env file in the root of your app folder or use these variables on your selected platform. This application uses NextAuth, Pusher, Cloudinary, GitHub (OAuth) and Google (OAuth).

```js
DATABASE_URL=
NEXTAUTH_SECRET=

NEXT_PUBLIC_PUSHER_APP_KEY=
PUSHER_APP_ID=
PUSHER_SECRET=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=

GITHUB_ID=
GITHUB_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

### Setup Prisma

```shell
npx prisma db push
```

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command | description                              |
| :------ | :--------------------------------------- |
| `dev`   | Starts a development instance of the app |

## Deploying a clone on Vercel

To host your own copy of this application, perform the install and setup steps previously mentioned and deploy on your preferred platform. The [Vercel Platform](https://vercel.com) is a simple option from the creators of Next.js and hosts the deployments seen on this repository.

For hosting your own copy on Vercel, please ensure that the .env variables are included via a .env file uploaded to your cloned repository OR [manually declaring the values](https://vercel.com/docs/projects/environment-variables) in the Vercel Project Settings.
