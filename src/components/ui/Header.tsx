import { Link } from "react-router-dom";

import { Button } from "./Button";
import { ChangeLanguage } from "../ChangeLanguage";

export function Header() {
  return (
    <header className="flex items-center justify-between">
      <Link to={"/"} className="flex items-center gap-1">
        <img src="logo.png" alt="Task Track logo" className="h-8 w-8" />
      </Link>
      <nav className="flex gap-2">
        <Link to={"/login"}>
          <Button type="button">Login</Button>
        </Link>
        <Link to={"/signup"}>
          <Button type="button">Sign Up</Button>
        </Link>
        <ChangeLanguage noLabel />
      </nav>
    </header>
  );
}
