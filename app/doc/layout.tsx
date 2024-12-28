import LiveBlocksProvider from '@/components/LiveBlocksProvider';

export default function DocumentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LiveBlocksProvider>{children}</LiveBlocksProvider>;
}
