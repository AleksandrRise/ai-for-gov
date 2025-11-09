import Sidebar from './sidebar';
import TopBar from './top-bar';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[80px_1fr] min-h-dvh">
      <Sidebar />
      <div className="relative">
        {children}
      </div>
    </div>
  );
}
