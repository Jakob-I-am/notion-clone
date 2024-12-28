import { auth } from '@clerk/nextjs/server';
import RoomProvider from '@/components/RoomProvider';

export default async function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  auth.protect();

  return <RoomProvider>{children}</RoomProvider>;
}
