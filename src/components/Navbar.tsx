"use client";
import { Button } from "@react-email/components";
import { User } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
function Navbar() {
  const { data: session } = useSession();

  const user: User = session?.user;

  return (
    <nav>
      <div className="container flex flex-col md:flex-row mx-auto justify-between items-center p-3">
        <a href="#" className="text-xl font-bold mb-4 md:mb-0">
          Mystry Message
        </a>

        {session ? (
          <>
            <span className="mr-4">Welcome, {user.username || user.email}</span>
            <Button className="w-full md:w-auto" onClick={() => signOut()}>
              Sign Out
            </Button>
          </>
        ) : (
          <Link href={`/sign-in`}>
            <Button className="w-full md:w-auto">Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
