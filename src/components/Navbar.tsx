"use client";

import { User } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";
function Navbar() {
  const { data: session } = useSession();

  const user: User = session?.user as User;

  return (
    <nav className="p-2 md:p-4 shadow-md">
      <div className="container flex flex-col md:flex-row mx-auto justify-between items-center p-3">
        <a href="#" className="text-xl font-bold mb-4 md:mb-0">
          Mystry Message
        </a>

        {session ? (
          <>
            <Button className="w-full md:w-auto">
              <Link href={`/dashboard`}>Dashboard </Link>
            </Button>
            <span className="mr-4">Welcome, {user.username || user.email}</span>
            <Button className="w-full md:w-auto" onClick={() => signOut()}>
              Sign Out
            </Button>
          </>
        ) : (
          <Button className="w-full md:w-auto">
            <Link href={`/sign-in`}>Login </Link>
          </Button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
