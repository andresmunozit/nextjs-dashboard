// This page will be available at the /dashboard path
// The page.tsx special name allows that only the content inside it will be publicly available. This
// allows to distinguish page routes from internal folders like `lib` and `ui`
export default function Page() {
    return <h1>Dashboard Page</h1>
}
