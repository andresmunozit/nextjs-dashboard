// To be able to use usePathname you need to add the 'use client' directive
'use client'

// Let's import the usePathname hook from next
import { usePathname } from 'next/navigation';

// Let's import the Link component from next
import Link from 'next/link'

// Let's import clsx thaht will be used for conditionally add class names
import clsx from 'clsx'; 

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
  return (
    <>
      {links.map((link) => {
        // Now get the pathname inside this component
        const pathname = usePathname()

        const LinkIcon = link.icon;
        return (
          /* <a
              key={link.name}
              href={link.href}
              className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          > */

          // Let's replace the <a> element with the Link client React component
          // Determine the Link component class name with clsx
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                'bg-sky-100 text-blue-600': pathname === link.href
              },
            )}
          >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
          </Link>
          // <a/>
        );
      })}
    </>
  );
}
