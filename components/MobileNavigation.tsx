"use client";
import Image from "next/image";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { Separator } from "./ui/separator";
import { navItems } from "@/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import FileUploader from "./FileUploader";
import { signOutUser } from "@/lib/actions/user.actions";

interface Props {
  avatar: string;
  ownerId: string;
  accountId: string;
  fullName: string;
  $id: string;
  email: string;
}

const MobileNavigation = ({
  avatar,
  $id: ownerId,
  accountId,
  fullName,
  email,
}: Props) => {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  return (
    <header className=" mobile-header">
      <Image
        src="/assets/icons/logo-full-brand.svg"
        alt="logo"
        width={120}
        height={52}
        className="h-auto"
      />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Image
            src="/assets/icons/menu.svg"
            alt="menu"
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </SheetTrigger>
        <SheetContent className="shad-sheet h-screen px-3">
          <SheetTitle>
            <div className="header-user">
              <Image
                src={avatar}
                alt="avatar"
                width={40}
                height={40}
                className="header-user-avatar"
              />
              <div className="sm:hidden lg:block">
                <p className="subtitle-2 capitalize">{fullName}</p>
                <p className="caption">{email}</p>
              </div>
              <Separator className="mb-4 bg-light-200/20" />
            </div>
          </SheetTitle>
          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              {navItems.map(({ name, url, icon }) => {
                const active = url === pathname;

                return (
                  <Link href={url} key={name} className="lg:w-full">
                    <li
                      className={cn("mobile-nav-item", active && "shad-active")}
                    >
                      <Image
                        src={icon}
                        alt={name}
                        width={24}
                        height={24}
                        className={cn("nav-icon", active && "nav-icon-active")}
                      />
                      <p>{name}</p>
                    </li>
                  </Link>
                );
              })}
            </ul>
          </nav>
          <Separator className="my-5 bg-light-200/20" />
          <div className=" flex flex-col justify-between gap-5 pb-5">
            <FileUploader ownerId={ownerId} accountId={accountId} />
            <Button
              type="submit"
              className="mobile-sign-out-button"
              onClick={async () => {
                await signOutUser();
              }}
            >
              <Image
                src="/assets/icons/logout.svg"
                alt="logout"
                width={24}
                height={24}
              />
              <p>Logout</p>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNavigation;
