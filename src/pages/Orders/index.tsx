import { useAtom } from 'jotai';

import { Orders } from '@/components/Orders';
import { mails } from './mock';

import { layoutState } from '@/atoms/pages/Orders/resizable';

export default function MailPage() {
  const [layout, setLayout] = useAtom(layoutState);

  return (
    <>
      <Orders mails={mails} layout={layout} setLayout={setLayout} />
    </>
  );
}
