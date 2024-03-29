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
$ npx create-next-app@latest nextjs-dashboard --use-npm --example 
"https://github.com/vercel/next-learn/tree/main/dashboard/starter-example"

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

## 11. Adding Search and Pagination
### Key Takeaways

#### Overview
In this guide, we're enhancing the `/invoices` page of our Next.js dashboard by adding search and 
pagination functionalities using URL search params. This approach provides bookmarkable URLs, 
supports server-side rendering for initial loads, and simplifies analytics tracking.

#### Technologies and Patterns
- **Next.js APIs**: Utilize `useSearchParams`, `usePathname`, and `useRouter` for managing URL 
parameters and navigation.
- **URL Search Params**: Implement search and pagination by manipulating URL parameters, offering 
bookmarkable states and seamless server-side data fetching.
- **Client and Server Components**: Distinguish between components that run on the client side, 
which can use event listeners and hooks, versus server components that fetch and render data.

#### Implementation Steps

##### Search Functionality
1. **Capture User Input**: Use a `handleSearch` function within the `<Search>` component to update 
the URL with user search terms.
2. **Update URL**: Leverage `useSearchParams` to modify the URL's query parameters based on the 
search input.
3. **Sync URL and Input**: Ensure the input field reflects the current search query from the URL, 
facilitating shared links to specific searches.
4. **Update Display**: Pass the current search query to components like `<Table>`, which then 
fetches and displays the relevant data.

##### Pagination
1. **Modify Page Component**: Fetch the total number of pages based on the search query and current 
pagination, using a server-side function.
2. **Update Pagination Component**: Use `usePathname` and `useSearchParams` within the 
`<Pagination>` component to navigate between pages without exposing database secrets.

#### Best Practices
- **Debouncing**: Implement debouncing to limit the rate of data fetching operations triggered by 
user input, improving performance and resource usage.
- **Separation of Concerns**: Differentiate between client-side and server-side logic for handling 
URL parameters and data fetching to maintain a clean architecture.

### Conclusion
By employing URL search params and Next.js APIs, we've added robust search and pagination features 
to our dashboard. These enhancements not only improve the user experience but also align with best 
practices for web development in React-based applications.

## Chapter 12: Mutating Data

In Chapter 12, we build upon the Invoices page functionality by integrating the creation, updating, 
and deletion of invoices through React Server Actions, forms, and server components. This chapter 
focuses on effective data mutation techniques, emphasizing security and user experience.

### Key Takeaways

- **React Server Actions** enable asynchronous code execution on the server without the need for 
separate API endpoints. They enhance security and simplify data mutation processes.
- **Forms and Server Components**: Utilize the `action` attribute within `<form>` elements to 
invoke server actions, supporting progressive enhancement by ensuring functionality even without 
client-side JavaScript.
- **formData and Type Validation**: Handling native `formData` objects with best practices for type 
validation ensures robust data processing. Techniques include using the `revalidatePath` API for 
client cache revalidation.
- **Dynamic Route Segments**: Implementing dynamic routes (`[id]`) facilitates the creation of 
specific URLs for editing individual invoices.
- **Security Considerations**: Server Actions bolster application security through encrypted 
closures, POST requests, and strict input validation, effectively mitigating various web threats.

#### Creating an Invoice

1. **Form Creation**: Start by setting up a form to collect invoice data, incorporating customer 
selection, amount input, and status options.
2. **Invoke Server Action**: Link the form to a server action for data processing, utilizing 
`formData` for data extraction and validation.
3. **Data Validation and Insertion**: Ensure data types match database expectations (e.g., 
converting amounts to cents for monetary values) and insert validated data into the database.
4. **Cache Revalidation and Redirection**: After data insertion, use `revalidatePath` to refresh 
client-side data and `redirect` to navigate back to the invoices page.

#### Updating an Invoice

1. **Dynamic Route for Editing**: Utilize a dynamic route segment to create an edit page for each 
invoice, enabling pre-population of form fields with existing invoice data.
2. **Server Action for Update**: Adapt the server action to handle form data submission, performing 
necessary validations and updating the invoice record in the database.
3. **Client Cache and Redirection**: Similar to creation, ensure the client cache is revalidated 
and redirect the user upon successful update.

#### Deleting an Invoice

1. **Deletion via Server Action**: Implement a server action for invoice deletion, triggered by a 
form submission (e.g., a delete button within the invoice list).
2. **Cache Revalidation**: Use `revalidatePath` to update the invoice list display without needing 
a manual page reload.

### Conclusion

This chapter demonstrates the power of React Server Actions in building interactive and secure web 
applications with Next.js. By embracing server-side logic for data mutations, developers can create 
more efficient, secure, and user-friendly web experiences.

## Chapter 13: Handling Errors

In Chapter 13, we explore strategies for handling errors gracefully in web applications using 
JavaScript's `try/catch` statements and Next.js APIs. Effective error handling ensures a robust 
user experience by providing fallback UIs and clear messages when things go wrong.

### Key Takeaways

- **Implementing `try/catch` in Server Actions**: Use `try/catch` blocks within Server Actions to 
gracefully handle errors. Ensure to call `redirect` outside the `try/catch` to avoid catching 
redirect errors as general exceptions.
- **Using `error.tsx` for Fallback UIs**: Create a special `error.tsx` file to define a UI boundary 
for route segments, serving as a catch-all for unexpected errors and displaying a fallback UI to 
users.
- **Handling 404 Errors with `notFound`**: Utilize the `notFound` function to handle 404 errors for 
resources that don't exist, providing a clear message to the user and improving the overall user 
experience.

### Graceful Error Handling Techniques

1. **Adding `try/catch` to Server Actions**: Encapsulate logic in Server Actions within `try/catch` 
blocks to catch and handle errors locally. Use `redirect` judiciously to navigate away from error 
states only when operations succeed.

2. **Centralized Error Handling with `error.tsx`**:
- Implement an `error.tsx` file within your route segments to act as an error boundary.
- This component should accept `error` and `reset` props, displaying an error message and 
providing a means to recover from errors.
- Utilize client-side logging or error reporting services within this component to capture error 
details.

3. **Specific 404 Error Handling with `notFound`**:
    - Use the `notFound` function to specifically handle cases where resources do not exist (404 
errors), providing a more targeted response than general error handling.
    - Implement a `not-found.tsx` file to display a custom 404 message, guiding users back to valid 
application routes or actions.

### Implementing Error Handling

- **Server Actions**: Incorporate `try/catch` blocks in Server Actions to gracefully manage 
exceptions, ensuring actions like `deleteInvoice` handle errors in a user-friendly manner.
- **Fallback UI with `error.tsx`**:
    - Define a catch-all error boundary using `error.tsx` in relevant route segments.
    - Display a generic error message with a retry button to attempt recovery.
- **404 Error Page**:
    - Leverage `notFound` in route-specific logic to detect and respond to 404 scenarios.
    - Create a `not-found.tsx` component to provide a clear, actionable message to users attempting 
to access nonexistent resources.

### Conclusion
Chapter 13 emphasizes the importance of thoughtful error handling in web applications. By 
integrating `try/catch` in Server Actions, utilizing Next.js's `error.tsx` and `notFound` for 
fallback UIs and specific error messages, developers can significantly enhance user experience 
during error states.

## Chapter 14: Improving Accessibility

In Chapter 14, we dive into enhancing the accessibility of web applications by focusing on form 
validation and error handling. This chapter emphasizes the importance of making web applications 
usable for everyone, including people with disabilities, through server-side validation and 
accessible form error handling.

### Key Takeaways

- **Accessibility (A11y) Basics**: Accessibility ensures that web applications are usable by 
everyone, including those with disabilities. It encompasses various aspects, including keyboard 
navigation, semantic HTML, and more.
- **ESLint Plugin for Accessibility**: Next.js incorporates the `eslint-plugin-jsx-a11y` to 
identify and resolve accessibility issues early in the development process, such as missing alt 
text for images.
- **Server-side Form Validation**: Validates form data on the server to ensure data integrity and 
security, offering a robust layer of validation beyond client-side checks.
- **React `useFormState` Hook**: Facilitates the handling and display of form errors, making it 
easier to present validation feedback to users in an accessible manner.

### Implementing Accessibility Best Practices

- **ESLint Accessibility Checks**: Use `next lint` to catch accessibility issues, such as missing 
alt attributes for images, ensuring that your application adheres to basic accessibility standards.
Next lint runs as part of the build process.
- **Form Accessibility Enhancements**:
    - Utilize semantic HTML elements and proper labeling to improve form navigation and 
understanding for assistive technologies.
    - Ensure visible focus indicators are present for interactive elements to aid keyboard 
navigation.
    - Implement accessible form validation feedback using the `useFormState` hook and server-side 
validation to inform users of errors in an understandable way.

### Server-side Validation and Accessible Error Handling

1. **Implementing Server-side Validation**: Use libraries like Zod to validate form data on the 
server, ensuring that all data conforms to expected formats before processing.
2. **Accessible Form Error Feedback**: Leverage the `useFormState` hook to manage form state and 
validation errors. Display error messages near form fields and use ARIA attributes 
(`aria-describedby`, `aria-live`) to enhance screen reader support.
3. **Practical ARIA Usage**:
    - `aria-describedby`: Links form inputs with their corresponding error messages, providing 
context for screen readers.
    - `aria-live="polite"`: Ensures screen readers announce dynamic content changes, such as error 
messages, without interrupting the user.

### Conclusion

Chapter 14 underscores the significance of accessibility in web development, focusing on practical 
approaches to making forms accessible and providing meaningful feedback through server-side 
validation. By integrating these practices, developers can create more inclusive web applications 
that cater to a broader audience, including individuals with disabilities.

## Chapter 15: Adding Authentication

In Chapter 15, we integrate authentication into our dashboard application, leveraging NextAuth.js 
for a seamless authentication experience. This chapter is crucial for securing access to the 
dashboard, ensuring that only authenticated users can view and interact with its content.

### Key Takeaways

- **Understanding Authentication**: Authentication is the process of verifying a user's identity, 
typically through credentials like usernames and passwords. It's distinct from authorization, which 
determines the resources a user can access after being authenticated.
- **NextAuth.js for Authentication**: NextAuth.js is utilized to simplify the authentication 
process in Next.js applications. It abstracts away the complexities of session management, social 
logins, and other authentication flows.
- **Middleware for Route Protection**: Middleware is introduced to protect dashboard routes, 
ensuring that only authenticated users can access them. This is achieved by redirecting 
unauthenticated users to the login page and preventing direct access to protected routes.
- **Form Handling with `useFormState` and `useFormStatus`**: These React hooks are employed to 
manage form submissions and handle errors, providing feedback to the user during the login process.

### Implementing Authentication with NextAuth.js

1. **Setup and Configuration**: Begin by installing NextAuth.js and configuring it with the 
necessary options, including secret keys for session encryption and specifying custom sign-in and 
error pages.
2. **Custom Login Page**: Create a custom login route (`/login`) and implement a user-friendly 
login form.
3. **Securing Routes with Middleware**: Utilize Next.js Middleware to protect dashboard routes, 
using the `authorized` callback within the NextAuth.js configuration to manage access based on user 
authentication status.
4. **Credentials Provider**: Integrate the Credentials provider to enable username and password 
authentication, allowing users to log in with their credentials stored in the application's 
database.
5. **Form Error Handling**: Employ the `useFormState` hook to capture and display form validation 
errors, improving user experience by providing immediate feedback on login failures.
6. **Authentication Flow**: Detail the process of hashing passwords, validating user credentials, 
and managing session tokens to securely authenticate users.
7. **Logout Functionality**: Implement a logout feature, enabling users to securely sign out of the 
application, with the process handled via NextAuth.js for simplicity.

### Practical Steps

- **Configuring NextAuth.js**: Follow the detailed steps to set up NextAuth.js, including 
generating a secret key and configuring the authentication providers.
- **Building a Custom Login Form**: Design and implement a custom login form, ensuring it is 
accessible and provides clear feedback to users.
- **Protecting Dashboard Routes**: Leverage Middleware to create a secure barrier for the 
dashboard, redirecting unauthorized access attempts and ensuring a secure user experience.
- **Implementing Logout**: Add a logout option within the user interface, allowing users to end 
their sessions and reinforcing the application's security posture.

### Conclusion

Chapter 15 equips developers with the tools and knowledge to implement robust authentication in 
Next.js applications. By following these guidelines, developers can ensure their applications are 
secure, user-friendly, and accessible, providing a solid foundation for building web applications 
that require user authentication.

## 16. Adding Metadata

### Overview
This chapter emphasizes the importance of metadata in enhancing SEO and shareability of webpages. 
Metadata, which resides within the HTML's `<head>` section, is pivotal for search engines and 
social media platforms to better understand and display content from webpages.

### Key Concepts
- **Definition**: Metadata provides detailed information about a webpage's content, crucial for SEO 
and improving the webpage's representation on social media.
- **Importance**: It aids in better indexing by search engines and enhances the appearance of links 
on social media, contributing to higher engagement and traffic.

### Types of Metadata
- **Title Metadata**: Defines the webpage's title shown on browser tabs, essential for SEO.
- **Description Metadata**: Offers a brief overview of the webpage, often used in search results.
- **Keyword Metadata**: Contains relevant keywords for search indexing.
- **Open Graph Metadata**: Improves link representation on social media with title, description, 
and images.
- **Favicon Metadata**: Links a small icon to the webpage, visible in browser tabs.

### Implementing Metadata in Next.js
Next.js facilitates metadata addition through:
- **Config-based**: Defining a static or dynamic metadata object in layout or page files.
- **File-based**: Utilizing special files (e.g., `favicon.ico`, `opengraph-image.jpg`) in the 
`/public` folder for icons and social media images.

### Practical Steps
1. **Favicon and Open Graph Images**: Place `favicon.ico` and `opengraph-image.jpg` in the `/app` 
folder's root for automatic recognition by Next.js.
2. **Page Titles and Descriptions**: Use the `Metadata` API to define titles and descriptions in 
`layout.tsx` or specific page files, enhancing individual page SEO.

### Dynamic Metadata
- **Dynamic OG Images**: Create using the `ImageResponse` constructor.
- **Page-specific Titles**: Override default titles by specifying metadata in page files. Utilize 
`title.template` in `layout.tsx` for consistent application naming.

### Example: Metadata Object in Root Layout
```tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Acme Dashboard',
  description: 'The official Next.js Course Dashboard, built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

```

### Best Practices
Ensure metadata accurately reflects the page content for better SEO performance.
Regularly update metadata to keep it relevant with content changes and keyword optimization.

#### Conclusion
Metadata is a fundamental aspect of web development that significantly impacts SEO and social media 
engagement. Next.js provides an efficient and straightforward approach to managing metadata, 
offering both config-based and file-based solutions to cater to different needs.
