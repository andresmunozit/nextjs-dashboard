// This will be the default layout for dashboard pages
import SideNav from '@/app/ui/dashboard/sidenav';

// The Layout component receives a children prop. It can be a page or another layout. All the pages
// inside /dashboard will be nested inside <Layout />
// One benefit is that on navigation, only the page components will be re-rendered, not the layout
// itself.
export default function Layout({ children }: { children: React.ReactNode}) {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                { /* Any imported components will be part of the layout */ }
                <SideNav />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{ children }</div>
        </div>
    )
}
