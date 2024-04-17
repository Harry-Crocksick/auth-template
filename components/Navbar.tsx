import Link from "next/link";
import { ModeToggle } from "./darkmode-button";

export default function Navbar() {
  return (
    <nav>
      <Link href={"/"} className="text-xl font-medium">
        Home
      </Link>
      <ModeToggle />
    </nav>
  );
}
