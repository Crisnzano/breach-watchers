"use client";
import { Menubar, MenubarMenu, MenubarTrigger } from "@radix-ui/react-menubar";
import MediumButton from "../mediumbutton";

export default function AppBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-10 p-2 bg-purple-900 border-b">
      <Menubar className="rounded-none border-none px-2 lg:px-4 flex justify-between items-center">
        <MenubarMenu>
          <MenubarTrigger>
            <p className="text-white text-xl font-bold">BreachWatchers</p>
          </MenubarTrigger>
        </MenubarMenu>
        <div className="ml-auto"> {/* Use ml-auto to push this to the right */}
          <a href="/sign-up">
            <MediumButton>Sign Up</MediumButton>
          </a>
        </div>
      </Menubar>
    </div>
  );
}
