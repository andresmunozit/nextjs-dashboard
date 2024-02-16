import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
// Let's import a CSS module
import styles from '@/app/ui/home.module.css'

// Let's import a custom next font
import { lusitana } from '@/app/ui/fonts';

// Image component from next
import Image from 'next/image'

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        {/* <AcmeLogo /> This component was commented because it required the lusitana font, let's
        add it*/}
        <AcmeLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">

        { /* Let's apply a next font to the following p element*/ }
          <p className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Acme.</strong> This is the example for the{' '}
            <a href="https://nextjs.org/learn/" className="text-blue-500">
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>

          { /* Let's add a div component to this code and style it using Tailwind */ }
          <div
            className='h-0 w-0 border-b-[30px] border-l-[20px] border-r-[20px] border-b-black border-l-transparent border-r-transparent'
          ></div>
          { /* Now, the same result but using CSS modules */ }
          <div
            className={styles.shape}
          ></div>

          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Add Hero Images Here */}
          <Image 
            src="/hero-desktop.png"
            width={1000}
            height={700}
            className='hidden md:block'
            alt='Screenshots of the dashboard project showing the desktop version'
          />

          { /* The following mobile image will be shown only on mobile screens. Note that we can
          reference any image in the public folder */ }
          <Image 
            src="/hero-mobile.png"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshot of the dashboard project showing mobile version"
          />
          { /* The md: prefix in Tailwind CSS enables responsive design adjustments for medium-sized screens and up. */ }
          { /* Using Tailwind CSS classes hidden md:block for desktop and block md:hidden for mobile
          with Next.js's <Image /> optimizes visibility per device size, ensuring responsive,
          device-optimized image display in web design. */ }
        </div>
      </div>
    </main>
  );
}
