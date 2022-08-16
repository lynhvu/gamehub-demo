import React from "react";
import Splash from "./Splash/Splash";
import GameList from "./GamePages/GameList";
import GamePage from "./GamePages/GamePage";
import CompanyList from "./CompanyPages/CompanyList";
import IndividualCompany from "./CompanyPages/IndividualCompany";
import Genres from "./Genres/Genres"
import AboutUs from "./AboutUs/AboutUs";
import GenresPage from "./Genres/GenresPage"
import Visualization from "./Visualization/Visualization"
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import GeneralSearch from "./General/GeneralSearch";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function AppPages() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/gamehub-demo' element={<Splash />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/games' element={<GameList />} />
          <Route path='/games/gamepage' element={<GamePage />} />
          <Route path='/companies' element={<CompanyList />} />
          <Route path='/companies/comp' element={<IndividualCompany />} />
          <Route path='/genres' element={<Genres />} />
          <Route path='/genrespage' element={<GenresPage />} />
          <Route path='/search' element={<GeneralSearch />} />
          <Route path='/visualization' element={<Visualization />} />
        </Routes>
      </div>
    </Router>
  );
}