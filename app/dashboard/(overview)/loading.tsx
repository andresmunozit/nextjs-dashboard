import DashboardSkeleton from '@/app/ui/skeletons';

// loading.tsx file is a special file in Next.js built on top of Suspense. It allows to create a
// fallback UI.
export default function Loading() {
  return <DashboardSkeleton />
}
