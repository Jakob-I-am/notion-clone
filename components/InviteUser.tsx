'use client';

import { FormEvent, useState, useTransition } from 'react';
import { useRoom } from '@liveblocks/react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { inviteUserToDocument } from '@/actions/actions';

export default function InviteUser() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState<string>('');
  const room = useRoom();

  const handleInvite = async (e: FormEvent) => {
    e.preventDefault();

    if (!room.id) {
      return;
    }

    startTransition(async () => {
      const { success } = await inviteUserToDocument(room.id, email);

      if (success) {
        setIsOpen(false);
        setEmail('');
        toast.success('User added to room successfully');
      } else {
        toast.error('Failed to add User to room');
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
        <DialogTrigger>Invite</DialogTrigger>
      </Button>

      <DialogContent className='bg-white'>
        <DialogHeader>
          <DialogTitle>Invite a User to collaborate!</DialogTitle>
          <DialogDescription>
            Enter the email of the user you want to invite.
          </DialogDescription>
        </DialogHeader>

        <form
          className='flex flex-col'
          onSubmit={handleInvite}
        >
          <label className='text-sm pb-2 text-gray-400'>Email</label>
          <div className='flex gap-2'>
            <Input
              placeholder='johncitizen@example.com'
              type='email'
              className='w-full'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button
              disabled={!email || isPending}
              type='submit'
              variant='outline'
            >
              {isPending ? 'Inviting...' : 'Invite'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
