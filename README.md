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

## 3. Optimizing Fonts and Images
Layout shift happens when the browser initally rernders a fallback or system font, and then swaps it
out for a custom font once it's loaded. This swap cause the text size, spacing, or layout to change,
shifting elements around it.

The `next/font` module downloads font files at build time and hosts them with other static assets.
In this way, when a user visits the application, there won't be needed additional  network requests.

Next.js can serve static assetts, like images under the `/public` folder, which can be referenced in
the application.

Using HTML, you would add an image as follows:
```html
<div
    src="/hero.png"
    alt="Screenshots from the dashboard project showing desktop version"
></div>

```

In this way you have to manually:
- Manage image responsiveness
- Specify image sizes for different devices
- Prevent layout shift as the images load
- Lazy load images thaat are outside of the user's viewport

Instead of consider manual lImage Optimization, you can use the `next/image` (Image) component. The
`<Image>` component is an extension of the `<img>` tag and comes with automatic immage optimization:
- Preventing layout shifting when images are loading
- Resizing images to avoid shipping large images to devices with smaller viewport
- Lazy loading images (they load as they enter the viewport)
- Serving images in modern formats like `WebP` and `AVIF`

## 4. Creating Layouts and Pages

### Nested routing
Next.js uses file-system routing, which means that each folder represent a route segment that maps
to a URL segment.

The `/app/page.tsx` file is the home page associated with the `/` route. The
`/app/dashboard/page.tsx` file is associated with the `/dashboard` path.

### Dashboard Layout
In Next.js you can use a special `layout.tsx` file to create UI that is shared between multiple
pages.

## 5. Navigating Between Pages
Let's add some links to allow users to navigate between the dashboard pages.

### Why optimize navigation
At the moment the sidebar links use `<a>` elements, which cause a full page refresh on each page
navigation.

### The `<Link>` component
The Link component can be used to do `client-side-navigation` with JavaScript.

### Automatic code-splitting and prefetching
Next.js enhances user experience by automatically splitting code per route, isolating pages to
ensure the application remains robust. Additionally, it prefetches content for links in view,
ensuring nearly instant page transitions when users navigate.

### Pattern: Showing active links
In order to show active links we need to get the user's current path from the URL. We can achieve
that by using the `usePathname` Next.js hook.
