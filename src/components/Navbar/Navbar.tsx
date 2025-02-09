"use client";

import Link from "next/link";
import { useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const Navbar = () => {
   const navItems = ["About", "Services", "Contact"];
   const [open, setOpen] = useState(false);
   const path = usePathname();

   return (
      <header
         className={`w-full bg-white bg-opacity-60 bg-[url('/images/navbg.jpg')] bg-cover bg-center bg-blend-soft-light`}
      >
         <nav className="container mx-auto flex justify-between items-center py-4 px-6">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-500">
               MediBridge
            </Link>

            {/* Desktop Menu */}
            <ul className="hidden md:flex space-x-6 text-gray-700">
               {navItems.map((item, i) => (
                  <li key={i}>
                     <Link
                        href={`/${item.toLowerCase()}`}
                        className={clsx(
                           "hover:text-blue-600 font-medium text-black",
                           path === "/" + item.toLowerCase() ? "underline text-primary" : "bg-none"
                        )}
                     >
                        {item}
                     </Link>
                  </li>
               ))}
            </ul>

            {/* Auth Buttons */}
            <div className="hidden md:flex space-x-4">
               <Button variant="outline">Sign In</Button>
               <Button>Sign Up</Button>
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={open} onOpenChange={setOpen}>
               <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                     <Menu className="h-6 w-6" />
                  </Button>
               </SheetTrigger>
               <SheetContent title="Navigators" side="left" className="p-6">
                  <SheetTitle className="text-2xl font-bold text-blue-600 ">MediBridge</SheetTitle>
                  <nav className="flex flex-col space-y-4 text-lg">
                     <Link
                        href={`/`}
                        onClick={() => setOpen(false)}
                        className="p-2 rounded-md transition-all duration-200 active:bg-gray-100 hover:bg-blue-100 hover:text-gray-800"
                     >
                        Home
                     </Link>
                     {navItems.map((item, i) => (
                        <Link
                           key={i}
                           href={`/${item.toLowerCase()}`}
                           onClick={() => setOpen(false)}
                           className="p-2 rounded-md transition-all duration-200 active:bg-gray-100 hover:bg-blue-100 hover:text-gray-800"
                        >
                           {item}
                        </Link>
                     ))}
                     <Button variant="outline" className="w-full active:scale-95">
                        Sign In
                     </Button>
                     <Button className="w-full active:scale-95">Sign Up</Button>
                  </nav>
               </SheetContent>
            </Sheet>
         </nav>
      </header>
   );
};

export default Navbar;
