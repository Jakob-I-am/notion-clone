'use client';

import {
  ClientSideSuspense,
  RoomProvider as RoomProviderWrapper,
} from '@liveblocks/react/suspense';
import { useParams } from 'next/navigation';

import LoadingSpinner from '@/components/LoadingSpinner';
import LiveCursorProvider from '@/components/LiveCursorProvider';

export default function RoomProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { id } = useParams();

  return (
    <RoomProviderWrapper
      id={id as string}
      initialPresence={{ cursor: null }}
    >
      <ClientSideSuspense fallback={<LoadingSpinner />}>
        <LiveCursorProvider>{children}</LiveCursorProvider>
      </ClientSideSuspense>
    </RoomProviderWrapper>
  );
}
