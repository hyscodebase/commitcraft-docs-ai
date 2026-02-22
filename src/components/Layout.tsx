import { Link, useLocation } from "react-router-dom";
import { GitCommitHorizontal } from "lucide-react";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/new", label: "New" },
  { path: "/sessions", label: "Sessions" },
  { path: "/docs", label: "Docs" },
  { path: "/faq", label: "FAQ" },
  { path: "/about", label: "About" },
];

const footerLinks = [
  { path: "/", label: "Home" },
  { path: "/docs", label: "사용 가이드" },
  { path: "/faq", label: "FAQ" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "문의하기" },
  { path: "/privacy", label: "개인정보처리방침" },
  { path: "/terms", label: "이용약관" },
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
          <nav className="flex items-center gap-1 overflow-x-auto" aria-label="주요 메뉴">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
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
      <footer className="border-t py-8">
        <div className="container">
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4" aria-label="푸터 메뉴">
            {footerLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <p className="text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} CommitCraft — DocOps Agent for Vibe Coders
          </p>
        </div>
      </footer>
    </div>
  );
}
