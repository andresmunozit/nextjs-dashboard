# Next Dashboard App
This is a simplified version of a financial dashboard that has:
- A public home page
- A login page
- Dashboard pages that are protected by authentication
- The ability for users to add, edit and delete invoices

The dashboard will also have an accompanying database.

## 1. Getting Started
### Creating a new project
This project folder was created as follows:
```
# --example [name]|[github-url]: An example to bootstrap the app with.
# --use-npm: Explicitly tell the CLI to bootstrap the application using npm
$ npx create-next-app@latest nextjs-dashboard --use-npm --example "https://github.com/vercel/next-learn/tree/main/dashboard/starter-example"

```

### Folder Structure
```
$ tree -d -L 2 -I 'node_modules'
.
├── app
│   ├── lib
│   └── ui
├── public
│   └── customers
└── scripts

```
- `/app`: Contains all the routes, components, and logic for the application. We'll be working on
this folder most of the time.
- `/app/lib`: Contains reusable functions of the app, such as utility and data fetching functions.
- `/app/ui`: Contains all the UI components of the application.
- `/public`: Contains all the static assets of the application, like images.
- `/scripts`: Contains a script that will be used to populate a database later.

### Placeholder Data
`/app/lib/placeholder-data.js` contains placeholder data that you'll be replacing with real data in
the Data Fetching chapter.

### TypeScript
`/app/lib/definitions.ts` contains type definitions the data that will be returned from the
database.

### Running the dev server
```
# Install the project's packages
$ npm i

# Start the development server
$ npm run dev

```

## 2. CSS Styling
You can import `global.css` in any component of the application, but it's good practice to add it
to the top level component, which in Next.js is the `/app/layout.tsx` component.

The CSS rules come from the `@tailwind` directives referenced inside `global.css`.

### Tailwind
Tailwind is a CSS framework that allows us to write utility classes direclty in the TSX markup.
When using `create-next-app` Next.js will ask if you want to use Tailwind and it will install all
the necessary dependencies in the application.

### CSS Modules
Allow you to scope CSS to a component by automatically creating unique class names so you don't
have to wory about collissions. Check the `/app/ui/home.module.css`.

### `clsx`
Is a library that allows to toggle or conditionally add class names easily.
