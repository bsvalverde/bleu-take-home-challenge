import { Menu } from "lucide-react";
import { NavItem } from ".";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { VisuallyHidden } from "../ui/visually-hidden";
import { BleuLogo } from "./bleu-logo";
import { ConnectWalletButton } from "./connect-wallet-button";
import NavLink from "./nav-link";
import { ThemeToggleButton } from "./theme-toggle-button";

interface Props {
  navItems: NavItem[];
}

export function MobileHeader({ navItems }: Props) {
  return (
    <header className="flex md:hidden relative items-center justify-between bg-content mx-2 mt-3 p-2 rounded-md md:h-16 md:mx-5 md:mt-6 md:px-5 md: rounded-3xl ">
      <BleuLogo />
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu />
          </Button>
        </DrawerTrigger>
        <DrawerContent aria-describedby={undefined}>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <VisuallyHidden>
                <DrawerTitle>Nav Menu</DrawerTitle>
              </VisuallyHidden>
              <VisuallyHidden>
                <DrawerDescription>Navigation and control</DrawerDescription>
              </VisuallyHidden>
              <div className="flex items-center justify-center gap-2">
                <ConnectWalletButton />
                <ThemeToggleButton />
              </div>
            </DrawerHeader>
            <div className="p-4 pt-0 flex flex-col gap-2 text-md">
              {navItems.map(({ label, path }) => (
                <NavLink key={`${label}->${path}`} href={path}>
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </header>
  );
}
