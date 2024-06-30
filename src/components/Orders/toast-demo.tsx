'use client';

import { Button } from '@/components/shadcn/new-york/button';
import { useToast } from '@/components/shadcn/new-york/use-toast';

export default function ToastDemo() {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: 'Scheduled: Catch up ',
          description: 'Friday, February 10, 2023 at 5:57 PM',
        });
      }}
    >
      Click
    </Button>
  );
}
