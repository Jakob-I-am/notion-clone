'use client';

import { useState, useTransition } from 'react';
import { useRoom } from '@liveblocks/react';
import { useRouter } from 'next/navigation';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { deleteDocument } from '@/actions/actions';

export default function DeleteDocument() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const room = useRoom();
  const router = useRouter();

  const handleDelete = async () => {
    if (!room) {
      return;
    }

    startTransition(async () => {
      const { success } = await deleteDocument(room.id);

      if (success) {
        setIsOpen(false);
        router.replace('/');
        toast.success('Document deleted successfully');
      } else {
        toast.error('An error occurred while deleting the document');
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
        variant='destructive'
      >
        <DialogTrigger>Delete</DialogTrigger>
      </Button>

      <DialogContent className='bg-white'>
        <DialogHeader>
          <DialogTitle>You are about to delete this document!</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            document and all of its contents, removing all users from the
            document and all of your data from our servers.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type='button'
            variant='destructive'
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>

          <DialogClose asChild>
            <Button
              type='button'
              variant='secondary'
            >
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
