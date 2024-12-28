'use client';

import { useDocumentData } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';
import Link from 'next/link';

import { db } from '@/firebase';
import { usePathname } from 'next/navigation';

interface SidebarOptionProps {
  id: string;
  href: string;
}

export default function SidebarOption({ id, href }: SidebarOptionProps) {
  const [data, loading, error] = useDocumentData(doc(db, 'documents', id));
  const pathname = usePathname();
  const isActive = href.includes(pathname) && pathname !== '/';

  if (!data) return null;

  return (
    <Link
      href={href}
      className={`border p-2 rounded-md
        ${isActive ? 'bg-gray-300 font-bold border-black' : 'border-gray-400'}`}
    >
      <p className='truncate'>{data.title}</p>
    </Link>
  );
}
