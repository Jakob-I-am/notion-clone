'use client';

import { MenuIcon } from 'lucide-react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useUser } from '@clerk/nextjs';
import {
  collectionGroup,
  DocumentData,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';
import { useEffect, useState } from 'react';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import NewDocumentButton from '@/components/NewDocumentButton';
import SidebarOption from '@/components/SidebarOption';

interface RoomDocument extends DocumentData {
  createdAt: string;
  role: 'owner' | 'editor';
  roomId: string;
  userId: string;
}

interface GroupedData {
  owner: RoomDocument[];
  editor: RoomDocument[];
}

export default function Sidebar() {
  const [groupedData, setGroupedData] = useState<GroupedData>({
    owner: [],
    editor: [],
  });

  const { user } = useUser();

  const [data, loading, error] = useCollection(
    user &&
      query(
        collectionGroup(db, 'rooms'),
        where('userId', '==', user.emailAddresses[0].toString())
      )
  );

  useEffect(() => {
    if (!data) return;

    const grouped = data.docs.reduce<GroupedData>(
      (acc, curr) => {
        const roomData = curr.data() as RoomDocument;

        if (roomData.role === 'owner') {
          acc.owner.push({
            id: curr.id,
            ...roomData,
          });
        } else {
          acc.editor.push({
            id: curr.id,
            ...roomData,
          });
        }

        return acc;
      },
      {
        owner: [],
        editor: [],
      }
    );

    setGroupedData(grouped);
  }, [data]);

  const menuOptions = (
    <>
      <NewDocumentButton />

      <div className='flex flex-col py-4 space-y-4 md:max-w-36'>
        {groupedData.owner.length === 0 ? (
          <h2 className='text-gray-500 font-semibold text-sm'>
            No Documents Found
          </h2>
        ) : (
          <>
            <h2 className='text-gray-500 font-semibold text-sm'>
              My Documents
            </h2>
            {groupedData.owner.map((doc: RoomDocument) => (
              <SidebarOption
                key={doc.id}
                id={doc.id}
                href={`/doc/${doc.id}`}
              />
            ))}
          </>
        )}

        {groupedData.editor.length > 0 && (
          <>
            <h2 className='text-gray-500 font-semibold text-sm'>
              Shared with Me
            </h2>
            {groupedData.editor.map((doc: RoomDocument) => (
              <SidebarOption
                key={doc.id}
                id={doc.id}
                href={`/doc/${doc.id}`}
              />
            ))}
          </>
        )}
      </div>
    </>
  );

  return (
    <div className='p-2 md:p-5 bg-gray-200 relative'>
      <div className='md:hidden'>
        <Sheet>
          <SheetTrigger>
            <MenuIcon
              className='p-2 hover:opacity-30 rounded-lg'
              size={40}
            />
          </SheetTrigger>
          <SheetContent
            className='bg-gray-200'
            side='left'
          >
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <div>{menuOptions}</div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div className='hidden md:inline'>{menuOptions}</div>
    </div>
  );
}
