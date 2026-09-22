import { Navigate, createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout/Layout.tsx";
import { Home } from "./pages/Home.tsx";
import { ONas } from "./pages/about/ONas.tsx";
import { Dzialalnosc } from "./pages/activity/Dzialalnosc.tsx";
import { ProjektDetail } from "./pages/projects/ProjektDetail.tsx";
import { AktualnoscDetail } from "./pages/news/AktualnoscDetail.tsx";
import { BazaWiedzy } from "./pages/knowledge/BazaWiedzy.tsx";
import { Kontakt } from "./pages/Kontakt.tsx";
import { Darowizna } from "./pages/Darowizna.tsx";
import { NotFound } from "./pages/NotFound.tsx";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/o-nas", element: <ONas /> },
      { path: "/zespol", element: <Navigate to="/o-nas#zespol" replace /> },
      { path: "/historia", element: <Navigate to="/o-nas#historia" replace /> },
      { path: "/statut-fundacji", element: <Navigate to="/o-nas#statut-fundacji" replace /> },
      { path: "/sprawozdania", element: <Navigate to="/o-nas#sprawozdania" replace /> },
      { path: "/deklaracja-roznorodnosci", element: <Navigate to="/o-nas#deklaracja-roznorodnosci" replace /> },
      { path: "/deklaracja-dostepnosci", element: <Navigate to="/o-nas#deklaracja-dostepnosci" replace /> },
      { path: "/dolacz-do-nas", element: <Navigate to="/o-nas#dolacz-do-nas" replace /> },
      { path: "/dzialalnosc", element: <Dzialalnosc /> },
      { path: "/projekty", element: <Navigate to="/dzialalnosc" replace /> },
      { path: "/projekt/:slug", element: <ProjektDetail /> },
      { path: "/aktualnosci", element: <Navigate to="/dzialalnosc#aktualnosci" replace /> },
      { path: "/aktualnosci/:slug", element: <AktualnoscDetail /> },
      { path: "/baza-wiedzy", element: <BazaWiedzy /> },
      { path: "/artykuly", element: <Navigate to="/baza-wiedzy" replace /> },
      { path: "/pytania-i-odpowiedzi", element: <Navigate to="/baza-wiedzy" replace /> },
      { path: "/linki", element: <Navigate to="/baza-wiedzy" replace /> },
      { path: "/kontakt", element: <Kontakt /> },
      { path: "/przekaz-darowizne", element: <Darowizna /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
