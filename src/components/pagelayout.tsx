import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <main className="flex-1">
      <div className="container mx-auto  flex flex-col items-center gap-4">
        {children}
      </div>
    </main>
  );
};

export default PageLayout;
