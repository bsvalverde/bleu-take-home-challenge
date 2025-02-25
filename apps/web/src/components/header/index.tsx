import { DesktopHeader } from "./desktop-header";
import { MobileHeader } from "./mobile-header";

export interface NavItem {
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "My NFTs",
    path: "/my-nfts",
  },
  {
    label: "Theme Showcase",
    path: "/theme-showcase",
  },
];

const Header = () => {
  return (
    <>
      <MobileHeader navItems={navItems} />
      <DesktopHeader navItems={navItems} />
    </>
  );
};

export default Header;
