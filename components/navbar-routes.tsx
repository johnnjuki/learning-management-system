"use client";

import { usePathname, useRouter } from "next/navigation";
import { UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { LogOut } from "lucide-react";

import { isTeacher } from "@/lib/teacher";

import { Button } from "./ui/button";
import { SearchInput } from "./search-input";

export const NavbarRoutes = () => {
  const { userId } = useAuth();

  const pathname = usePathname();
  const router = useRouter();

  // Used to change the navbar based on the current page
  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePlayerPage = pathname?.includes("/courses"); // individual course page
  const isSearchPage = pathname === "/search";

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="ml-auto flex gap-x-2">
        {isTeacherPage || isCoursePlayerPage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="mr-2 h-4 w-4" />
              Exit
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Teacher mode
            </Button>
          </Link>
        ) : null}
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};
