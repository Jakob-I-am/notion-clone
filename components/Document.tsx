import { FormEvent, useEffect, useState, useTransition } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { db } from '@/firebase';

interface DocumentProps {
  id: string | string[] | undefined;
}

export default function Document({ id }: DocumentProps) {
  const [data, loading, error] = useDocumentData(
    doc(db, 'documents', id as string)
  );
  const [input, setInput] = useState<string>('');
  const [isUpdating, startTransition] = useTransition();
  // const isOwner = useOwner();

  useEffect(() => {
    if (!loading && data) {
      setInput(data.title);
    }
  }, [data]);

  const updateTitle = (e: FormEvent) => {
    e.preventDefault();

    if (input.trim()) {
      startTransition(async () => {
        await updateDoc(doc(db, 'documents', id as string), {
          title: input,
        });
      });
    }
  };

  return (
    <div>
      <div className='flex max-w-6xl mx-auto justify-between pb-5'>
        <form
          onSubmit={updateTitle}
          className='flex flex-1 space-x-2'
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            disabled={isUpdating}
            type='submit'
          >
            {isUpdating ? 'Updating...' : 'Update'}
          </Button>
        </form>
      </div>

      <div>
        {/* Manage Users */}

        {/* Avatars */}
      </div>

      {/* Collabrative Editor */}
    </div>
  );
}
