import "../StyleAndImg/style.css";
import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import BackBtn from "../BackBtn";
import Mark from "mark.js";
import { Label } from "recharts";

const GameList = (props) => {
  var genredata = require('../Genres/genresdata.json');
  var companydata = require('../CompanyPages/companydata.json');
  var gamedata = require('./gamedata.json');
  var [gameData, setData] = useState([]) // full dataset of games
  var [games, setGames] = useState([])  // filtered games to display
  const [comps, setComps] = useState([])
  const [gens, setGens] = useState([])

  const [term, setTerm] = useState("");

  useEffect(() => {
    if(term != ""){
      highlight(term)
    } else {
      unhighlight()
    }
  }, [games])

  useEffect(() => {
    fetch("/gamedata/").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        setGames(data)
        console.log(data)
        console.log(data.length)
      }
    ).catch(err => console.log(err))

    // get the companies (to reference for company_id)
    fetch("/companydata/").then(
      res => res.json()
    ).then(
      data => {
        setComps(data)
        console.log(data)
        console.log(data.length)
      }
    ).catch(err => console.log(err))

    fetch("/genresdata/").then(
      res => res.json()
    ).then(
      data => {
        setGens(data)
        console.log(data)
        console.log(data.length)
      }
    ).catch(err => console.log(err))
  }, [])

  /*var gameData = require("./gamedata.json");*/

  const [pageNumber, setPageNumber] = useState(0);

  const gamesPerPage = 10;
  const pagesVisited = pageNumber * gamesPerPage;

  const options = [
    { value: "name", text: "Title" },
    { value: "developer", text: "Company" },
    { value: "genre", text: "Genre" },
    { value: "score", text: "Metascore" },
    { value: "platforms", text: "Platforms" },
  ];

  const platform_consoles = ["Nintendo Switch", "Nintendo DS", "Wii", "Wii U", "Game Boy Advance", 
                            "Nintendo 64", "PlayStation", "PlayStation 2", "PlayStation 3", 
                            "PlayStation 4", "PlayStation 5", "PSP", "PS Vita", "Xbox", "Xbox 360",
                            "Xbox One", "Xbox Series S/X", "macOS", "Linux", "PC", "Android", "iOS", 
                            "Dreamcast", "GameCube"]

  const [selected, setSelected] = useState(options[0].value);

  const orders = [
    { value: 1, text: "Ascending" },
    { value: -1, text: "Descending" },
  ];

  const [order, setOrder] = useState(orders[0].value);

  const handleSelectChange = (event) => {
    console.log(event.target.value);
    setSelected(event.target.value);
  };

  const handleOrderChange = (event) => {
    console.log(event.target.value);
    setOrder(event.target.value);
  };

  // Sort the table by attributes in the selection menu
  function sortByProperty() {
    var objArray = games;
    var prop = "attributes." + selected;
    var direct = order;
    if (!Array.isArray(objArray))
      throw new Error("FIRST ARGUMENT NOT AN ARRAY");
    const clone = objArray.slice(0);
    const propPath = prop.constructor === Array ? prop : prop.split(".");
    clone.sort(function (a, b) {
      for (let p in propPath) {
        if (a[propPath[p]] && b[propPath[p]]) {
          a = a[propPath[p]];
          b = b[propPath[p]];
        }
      }
      return a < b ? -1 * direct : a > b ? 1 * direct : 0;
    });
    games = clone;
  }

  sortByProperty();

  // search by name, new
  function searchFor(term) {
    setPageNumber(0);
    setGames(gameData.filter(function (item) {
      return item.name.toLowerCase().includes(term.toLowerCase()) || item.description.toLowerCase().includes(term.toLowerCase())
    }));
  }

  function highlight(term) {
    unhighlight();
    var context = document.querySelector(".context"); // requires an element with class "context" to exist
    var instance = new Mark(context);
    var options = {
      "separateWordSearch": false,
      "accuracy": "partially",
      "caseSensitive": false,
    }
    instance.mark(term, options); // will mark the keyword 
  }

  function unhighlight() {
    var context = document.querySelector(".context"); // requires an element with class "context" to exist
    var instance = new Mark(context);
    instance.unmark(); // will mark the keyword 
  }

  function reset() {
    setPageNumber(0);
    document.querySelector('#searched-text').value = '';
    setTerm("")
    setGames(gameData);
  }

  const displayGames = gamedata
    .slice(pagesVisited, pagesVisited + gamesPerPage)
    .map((item) => {
      return (
        <div className="">
        <Link
          to={{ pathname: "/games/gamepage" }}
          onClick={() => {
            localStorage.setItem("GAME", JSON.stringify(item));
          }}
          style={{ textDecoration: "none" }}
        >
          <div class="row row2 align-items-center">
            <div class="col-lg col-12">{item.name}</div>
            <div class="col-lg col-12">{compIDtoCompName(item.company_id)}</div>
            <div class="col-lg col-12">{genName(item.genre_id)}</div>
            <div class="col-lg col-12">{item.score}</div>
            <div class="col-lg col-12">
              {item.platforms.join(', ')}
            </div>
          </div>
        </Link></div>
      );
    });

  function compIDtoCompName(givenId) {
    for (var i = 0; i < companydata.length; i++) {
      if (companydata[i].id == givenId) {
        return companydata[i].name;
      }
    }
  }

  // get genre name from id
  function genName(id) {
    for (var i = 0; i < genredata.length; i++) {
      if (genredata[i].id == id) {
        return genredata[i].name;
      }
    }
  }

  const pageCount = Math.ceil(gamedata.length / gamesPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };


  function applyFilters(startChar, endChar, metaScore, compList, genreList, consoles) {
    setGames(gameData.filter(function (item) {
      var qualifies = true;
      if (startChar && endChar) {
        qualifies &= item.name.charAt(0).toLowerCase() >= startChar.toLowerCase() && item.name.charAt(0).toLowerCase() <= endChar.toLowerCase();
        console.log("here4")
      }

      {
        var selected = Array.from(compList.selectedOptions);
        if (selected.length != 0) {
          var selectedVals = selected.map(option => option.value);
          qualifies &= selectedVals.includes(item.company_id.toString());
        }
      }

      {
        var selected = Array.from(genreList.selectedOptions);
        if (selected.length != 0) {
          var selectedVals = selected.map(option => option.value);
          qualifies &= selectedVals.includes(item.genre_id.toString());
        }
      }


      if (metaScore != -1) {
        qualifies &= item.score >= metaScore;
      }

      {
        var selected = new Array();
        for (var i = 0; i < consoles.length; i++) {
          if (consoles[i].checked) {
            selected.push(consoles[i].value);
          }
        }
        if (selected.length != 0) {
          var intersectionResult = selected.filter(x => item.platforms.indexOf(x) !== -1);
          qualifies &= intersectionResult.length != 0 ? true : false;
        }
      }

      return qualifies;
    }));
  }

  function clearValues() {
    document.getElementById("startChar").value = ''
    document.getElementById("endChar").value = ''
    document.getElementById("metaScore").value = -1
    document.getElementById("sliderVal").value = 0

    var selectedComps = document.getElementById("comp-multi-selections")
    for (var elem of selectedComps) {
      elem.selected = false
    }

    var selectedGenres = document.getElementById("genre-multi-selections")
    for (var elem of selectedGenres) {
      elem.selected = false
    }

    var listOfPlatforms = document.getElementById("platform-list").getElementsByTagName("INPUT")
    for (var elem of listOfPlatforms) {
      elem.checked = false
    }
  }

  return (
    <div className="page default-bg">
      <link rel="stylesheet" href="style.css" type="text/css" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Mono&display=swap"
        rel="stylesheet"
      />

      <NavBar></NavBar>

      <div className="listTitleText" style={{ animation: "fadeIn 0.5s" }}>
        Games
      </div>
      <br></br>

      {/* Search button*/}
      <input type="text" name="search" id="searched-text" placeholder="Search Games"
        value={term} onChange={(event) => {setTerm(event.target.value)}}></input>
      <button className="searchbttn" onClick={() => {searchFor(term)}}>Search</button>
      <button className="searchbttn" onClick={() => {reset()}}>Reset</button>

      {/* Filter options */}
      <button type="button" class="searchbttn" id="filter" data-toggle="modal" data-target="#exampleModal">
        Adjust Filters
      </button>
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Adjust Filters</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p class="filter-title">Names (Starting character to ending character, filter by alphabetical order):</p>
              <input type="text" name="startChar" id="startChar" placeholder="A" maxlength="1"></input>
              &nbsp;-&nbsp;
              <input type="text" name="endChar" id="endChar" placeholder="Z" maxlength="1"></input>
              <br /><br />

              <label for="company-selection" class="filter-title">Companies:</label>
              <br />
              <select class="form-select" name="company-selection" id="comp-multi-selections" multiple>
                {comps.map((comp, i) => (
                  <option value={i}>{compIDtoCompName(i)}</option>
                ))}
              </select>
              <br /><br />

              <label for="genre-select" class="filter-title">Genres:</label>
              <br />
              <select class="form-select" name="genre-select" id="genre-multi-selections" multiple>
                {gens.map((genre, i) => (
                  <option value={i}>{genName(i)}</option>
                ))}
              </select>
              <br /><br />

              <label for="customRange3" class="form-label filter-title">Minimum Metascore:</label>
              <input type="range" class="form-range" min="0" max="100" step="1" id="metaScore" onChange={ (e) => document.getElementById("sliderVal").value = e.target.value}></input>
              <input type="number" id="sliderVal" placeholder="50" onChange={ (e) => document.getElementById("metaScore").value = e.target.value}></input>
              <br /><br />
              <label for="platform-list" class="filter-title">Platform:</label>
              <br /><br />
              <li class="platform-list" id="platform-list" style={{ listStyleType: "none" }}>
                {platform_consoles.map((plat) => (
                  <div style={{ padding: "3px" }}>
                    <label for="{plat}-plat">
                      <input type="checkbox" name="{plat}-plat" value={plat} style={{ paddingLeft: "3px" }}>
                      </input>
                      {plat}</label>
                  </div>
                ))}
              </li>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-secondary" onClick={() => clearValues()}>Clear</button>
              <button type="button" class="btn btn-primary" onClick={() => applyFilters(
                document.getElementById("startChar").value,
                document.getElementById("endChar").value,
                document.getElementById("metaScore").value,
                document.getElementById("comp-multi-selections"),
                document.getElementById("genre-multi-selections"),
                document.getElementById("platform-list").getElementsByTagName("INPUT"))}>Save changes</button>
            </div>
          </div>
        </div>
      </div>

      {/* Sorting options */}
      <div className="row mb-2">
        <div className="col justify-items-center">
          <div className="gamelist-select-table">Sort By:</div>
          <div className="form-container">
            <select className="form-select" value={selected} onChange={handleSelectChange}>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          </div>
          <div className="form-container">
            <select className="form-select" value={order} onChange={handleOrderChange}>
              {orders.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div class="container">
        <div
          class="row bg-dark text-light mb-2"
          style={{ opacity: 0.9, borderRadius: 1, textAlign: "center" }}
        >
          <div class="col-lg col-12">Game Title</div>
          <div class="col-lg col-12">Company</div>
          <div class="col-lg col-12">Genre</div>
          <div class="col-lg col-12">Metascore</div>
          <div class="col-lg col-12">Platforms</div>
        </div>
        <div className="context">
        {displayGames}</div>
        <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </div>
      <BackBtn></BackBtn>
    </div>
  );
};

export default GameList;
