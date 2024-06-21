import { useAtom } from 'jotai';

import { Mail } from '@/components/shadcn-mail';
import { accounts, mails } from './mock';

import { layoutState, collapsedState } from '@/atoms/pages/Home/resizable';

export default function MailPage() {
  const [layout, setLayout] = useAtom(layoutState);
  const [collapsed, setIsCollapsed] = useAtom(collapsedState);

  return (
    <>
      <Mail
        accounts={accounts}
        mails={mails}
        layout={layout}
        collapsed={collapsed}
        navCollapsedSize={4}
        setIsCollapsed={setIsCollapsed}
        setLayout={setLayout}
      />
    </>
  );
}
