import { Link, useLocation } from "react-router-dom";
import { GitCommitHorizontal } from "lucide-react";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/new", label: "New" },
  { path: "/sessions", label: "Sessions" },
  { path: "/about", label: "About" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex h-14 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-mono font-semibold text-lg">
            <GitCommitHorizontal className="h-5 w-5 text-primary" />
            CommitCraft
          </Link>
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.path
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t py-4">
        <div className="container text-center text-sm text-muted-foreground">
          CommitCraft — DocOps Agent for Vibe Coders
        </div>
      </footer>
    </div>
  );
}
