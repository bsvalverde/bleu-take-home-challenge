import { NavItem } from ".";
import { BleuLogo } from "./bleu-logo";
import { ConnectWalletButton } from "./connect-wallet-button";
import NavLink from "./nav-link";
import { ThemeToggleButton } from "./theme-toggle-button";

interface Props {
  navItems: NavItem[];
}

export function DesktopHeader({ navItems }: Props) {
  return (
    <header className="hidden md:flex relative h-16 items-center justify-between bg-content mx-5 mt-6 px-5 rounded-3xl ">
      <BleuLogo />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4 text-lg">
        {navItems.map(({ label, path }) => (
          <NavLink key={`${label}->${path}`} href={path}>
            {label}
          </NavLink>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <ConnectWalletButton />
        <ThemeToggleButton />
      </div>
    </header>
  );
}
