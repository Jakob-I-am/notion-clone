'use client';

import { useParams } from 'next/navigation';

import Document from '@/components/Document';

export default function DocumentPage() {
  const { id } = useParams();

  return (
    <div className='flex-1 min-h-screen'>
      <Document id={id} />
    </div>
  );
}
