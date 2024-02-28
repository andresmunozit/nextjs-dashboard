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
have to worry about collissions. Check the `/app/ui/home.module.css`.

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


## 6. Setting Up Your Database
We have modified the `app/lib/data.ts` file to work with a local Postgres database. Instead of using
the Velcel database driver we're getting advantage of the `pg` package.

A `docker-compose.yml` file has been created, it contains the configuration for running a local
Postgres database.
```sh
# Running the local database
$ docker compose up

```

Also you have to update the `.env` file for adding the local database url with the following value:
```
POSTGRES_URL=postgresql://postgres:postgres@localhost:5432/postgres

```
## 7. Fetching Data

Chapter 7 focuses on various strategies and best practices for fetching data in web applications,
highlighting the importance of choosing the right method based on the specific requirements and
context of your project. Here are the key takeaways:

### Different Approaches to Fetching Data
Understanding when to use APIs, ORMs, SQL, and other 
methods is crucial. APIs serve as a secure layer between your application and the database, 
especially when
dealing with third-party services or client-side data fetching. ORMs and SQL provide direct ways to
interact with your database, with SQL being essential for relational databases.

### Server Components for Secure Data Access
Next.js's Server Components allow for direct database
queries without exposing sensitive information to the client. This method offers a secure and
efficient way to handle data fetching on the server side, leveraging async/await syntax for
simplicity.

### Understanding Network Waterfalls
The concept of network waterfalls, where data requests depend on 
the completion of previous requests, is important for optimizing performance. Avoiding 
unintentional waterfalls by fetching data in parallel can significantly improve response times.

### Parallel Data Fetching
Implementing parallel data fetching using JavaScript patterns like 
Promise.all() or Promise.allSettled() can enhance performance by initiating all data requests 
simultaneously. This approach is particularly useful when multiple, independent data fetches are 
required for a page or component.

### Practical Application
The chapter illustrates these concepts through the example of building a 
dashboard overview page. It shows how to fetch data for various components (e.g., revenue charts, 
latest invoices) using direct database queries with SQL, emphasizing the performance benefits of 
parallel fetching and the security advantages of server-side execution.

### SQL's Role
SQL's versatility and industry-standard status are underscored, along with practical 
advice on using it for targeted data manipulation and fetching. The Vercel Postgres SDK is 
highlighted for its protection against SQL injections, providing a safe and powerful way to query 
databases.

## 8. Static and Dynamic Rendering
The key takeaways from the chapter on Static and Dynamic Rendering in Next.js can be summarized as
follows:

### Static Rendering
- Data fetching and rendering occur at build time or during revalidation, allowing the content to be
cached and distributed through a CDN.
- Benefits include faster website load times, reduced server load, and improved SEO.
- Ideal for pages with unchanging content or content shared across users, but not suitable for
applications like dashboards with regularly updated, personalized data.

### Dynamic Rendering
- Content is rendered on the server for each user at request time, enabling the display of 
real-time or frequently updated data.
- Allows for personalized content and the use of request-time information like cookies or URL 
search parameters.
- Essential for applications where data changes frequently or personalization is critical.

### Making Dashboards Dynamic
- By default, @vercel/postgres does not set caching semantics, allowing for flexible static and 
dynamic rendering adjustments.
- Using `unstable_noStore` from `next/cache` in data fetching functions prevents caching, opting 
out of static rendering for dynamic content updates.
- Note: `unstable_noStore` is experimental and may change. For stable projects, consider using the 
Segment Config Option for dynamic rendering.

### Simulating Slow Data Fetch
- Demonstrates the impact of a slow data fetch on dynamic rendering, where the application's speed 
is limited by the slowest data fetch.
- An artificial delay in fetching data can significantly affect page load times, emphasizing the 
importance of optimizing data retrieval for dynamic content.

### Conclusion
- Understanding and appropriately applying static and dynamic rendering techniques can 
significantly enhance application performance and user experience.
- Developers must choose the right rendering strategy based on content type, update frequency, and 
personalization requirements to balance performance and dynamic content needs.

## 9. Streaming
This chapter is about optimizing the user experience when there are slow data requests.

### What is Streaming?
Streaming can be used to load the page in chunks (such as React components), so the user can
interact with parts of the application without waiting for all the data to be load before any UI
can be shown to the user.

Streaming can be implemented at page level, with the `loading.tsx` file, or for specific components
with `<Suspense>`.

`loading.tsx` file is a special file in Next.js built on top of Suspense. It allows to create a
fallback UI.

### Fix the loading skeleton bug with route groups
Route groups can be used to organize files into logical groups without affecting the URL path
structure.

With the current structure, the `loading.tsx` file is being applied also to the customers and
invoices pages: 
```
├── app
│   ├── dashboard
│   │   ├── customers
│   │   ├── invoices
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   └── page.tsx

```

With the following configuration, `loading.tsx` only applies to the dashboard page:
```
├── app
│   ├── dashboard
│   │   ├── customers
│   │   │   └── page.tsx
│   │   ├── invoices
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── (overview)
│   │       ├── loading.tsx
│   │       └── page.tsx

```

### Streaming a component
Suspense allows you to defer rendering parts of the application until some condition is met. You can
wrap your dynamic components with Suspense. In order to do so, we need to transfer any data fetching
data to the component.

### Summary: Effective Use of Suspense Boundaries

#### Considerations for Suspense Placement
- **User Experience:** Optimize how users perceive page loading.
- **Content Prioritization:** Decide which content loads first.
- **Data Fetching Dependencies:** Identify if components need data fetching.

#### Strategies
- **Whole Page Streaming:** Can lead to longer load times for slow-fetching components.
- **Individual Component Streaming:** May cause UI elements to appear abruptly.
- **Section Streaming:** Balances loading by grouping components, requiring wrapper components.

#### Recommendations
- Move data fetching to relevant components and use Suspense for encapsulation.
- Experiment with different strategies to find what best suits the application's needs.
- No single correct approach; varies based on application requirements.
