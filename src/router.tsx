import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout/Layout.tsx";
import { Home } from "./pages/Home.tsx";
import { ONas } from "./pages/about/ONas.tsx";
import { Zespol } from "./pages/about/Zespol.tsx";
import { Historia } from "./pages/about/Historia.tsx";
import { StatutFundacji } from "./pages/about/StatutFundacji.tsx";
import { Sprawozdania } from "./pages/about/Sprawozdania.tsx";
import { DeklaracjaRoznorodnosci } from "./pages/about/DeklaracjaRoznorodnosci.tsx";
import { DeklaracjaDostepnosci } from "./pages/about/DeklaracjaDostepnosci.tsx";
import { DolaczDoNas } from "./pages/about/DolaczDoNas.tsx";
import { Projekty } from "./pages/projects/Projekty.tsx";
import { ProjektDetail } from "./pages/projects/ProjektDetail.tsx";
import { Aktualnosci } from "./pages/news/Aktualnosci.tsx";
import { AktualnoscDetail } from "./pages/news/AktualnoscDetail.tsx";
import { BazaWiedzy } from "./pages/knowledge/BazaWiedzy.tsx";
import { Artykuly } from "./pages/knowledge/Artykuly.tsx";
import { PytaniaOdpowiedzi } from "./pages/knowledge/PytaniaOdpowiedzi.tsx";
import { Linki } from "./pages/knowledge/Linki.tsx";
import { Kontakt } from "./pages/Kontakt.tsx";
import { Darowizna } from "./pages/Darowizna.tsx";
import { NotFound } from "./pages/NotFound.tsx";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/o-nas", element: <ONas /> },
      { path: "/zespol", element: <Zespol /> },
      { path: "/historia", element: <Historia /> },
      { path: "/statut-fundacji", element: <StatutFundacji /> },
      { path: "/sprawozdania", element: <Sprawozdania /> },
      { path: "/deklaracja-roznorodnosci", element: <DeklaracjaRoznorodnosci /> },
      { path: "/deklaracja-dostepnosci", element: <DeklaracjaDostepnosci /> },
      { path: "/dolacz-do-nas", element: <DolaczDoNas /> },
      { path: "/projekty", element: <Projekty /> },
      { path: "/projekt/:slug", element: <ProjektDetail /> },
      { path: "/aktualnosci", element: <Aktualnosci /> },
      { path: "/aktualnosci/:slug", element: <AktualnoscDetail /> },
      { path: "/baza-wiedzy", element: <BazaWiedzy /> },
      { path: "/artykuly", element: <Artykuly /> },
      { path: "/pytania-i-odpowiedzi", element: <PytaniaOdpowiedzi /> },
      { path: "/linki", element: <Linki /> },
      { path: "/kontakt", element: <Kontakt /> },
      { path: "/przekaz-darowizne", element: <Darowizna /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
