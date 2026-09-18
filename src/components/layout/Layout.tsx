import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { TopBar } from "./TopBar.tsx";
import { Header } from "./Header.tsx";
import { Footer } from "./Footer.tsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <a
        href="#main"
        className="sr-only rounded-md bg-brand px-4 py-2 text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
      >
        Przejdź do treści
      </a>
      <TopBar />
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
