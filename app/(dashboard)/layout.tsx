import { UserButton } from "@clerk/nextjs";
import React from "react";
import Logo from "../../components/Logo";
import ThemeSwitch from "../../components/ThemeSwitch";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
      <nav className="flex justify-between border-b border-border h-[60px[ px-4 py-2 items-center">
        <Logo />
        <div className="flex gap-4 items-center">
          <ThemeSwitch />
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </nav>
      <main className="flex w-full flex-grow">{children}</main>
    </div>
  );
};

export default Layout;
