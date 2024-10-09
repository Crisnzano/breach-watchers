"use client";
import { Menubar,MenubarMenu,MenubarTrigger } from "@radix-ui/react-menubar";
/*import AccountMenu from "@/components/account/AccountMenu";*/
/*import { Logo } from "@/components/layout/logo";*/

export default function AppBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-10 p-2 bg-purple-900 border-b ">
      <Menubar className="rounded-none border-none px-2 lg:px-4">
        <MenubarMenu>
          <div className=" lg:hidden"></div>
          <MenubarTrigger>
            <p className="text-white text-xl font-bold"> BreachWatchers </p>
          </MenubarTrigger>
        </MenubarMenu>
        <div className="grow" />
        <section className="my-12 mx-6 ">
          {/*<AccountMenu />*/}
        </section>
      </Menubar>
    </div>
  );
}
