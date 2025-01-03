'use client';

import { FormEvent, useState, useTransition } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRoom } from '@liveblocks/react';
import { collectionGroup, query, where } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { toast } from 'sonner';

import useOwner from '@/lib/useOwner';
import { db } from '@/firebase';
import { removeUserFromDocument } from '@/actions/actions';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function ManageUsers() {
  const { user } = useUser();
  const room = useRoom();
  const isOwner = useOwner();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [usersInRoom] = useCollection(
    user && query(collectionGroup(db, 'rooms'), where('roomId', '==', room.id))
  );

  const handleDelete = (userId: string) => {
    startTransition(async () => {
      if (!user) return;

      const { success } = await removeUserFromDocument(room.id, userId);

      if (success) {
        toast.success('User removed from room successfully');
      } else {
        toast.error('Failed to remove User from room');
      }
    });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <Button
        asChild
        variant='outline'
      >
        <DialogTrigger>Users ({usersInRoom?.size})</DialogTrigger>
      </Button>

      <DialogContent className='bg-white'>
        <DialogHeader>
          <DialogTitle>Users with Access</DialogTitle>
          <DialogDescription>
            Below is a list of users wiith access to this document.
          </DialogDescription>
        </DialogHeader>

        <hr className='my-2' />

        <div className='flex flex-col space-y-2'>
          {usersInRoom?.docs.map((doc) => (
            <div
              className='flex items-center justify-between'
              key={doc.data().userId}
            >
              <p className='font-light'>
                {doc.data().userId === user?.emailAddresses[0].toString()
                  ? `You (${doc.data().userId})`
                  : doc.data().userId}
              </p>

              <div className='flex items-center gap-2'>
                <Button variant='outline'>{doc.data().role}</Button>

                {isOwner &&
                  doc.data().userId !== user?.emailAddresses[0].toString() && (
                    <Button
                      variant='destructive'
                      onClick={() => handleDelete(doc.data().userId)}
                      disabled={isPending}
                      size='sm'
                    >
                      {isPending ? 'Removing...' : 'X'}
                    </Button>
                  )}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
