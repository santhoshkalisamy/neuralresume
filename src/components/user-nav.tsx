"use client";

import {SignedIn, UserButton} from "@clerk/nextjs";

export function UserNav() {
  return (
    <SignedIn>
      <UserButton></UserButton>
    </SignedIn>
  );
}
