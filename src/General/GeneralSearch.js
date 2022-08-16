import "../StyleAndImg/style.css";
import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Row, Card, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import BackBtn from "../BackBtn";
import Mark from "mark.js";


const GeneralSearch = (props) => {
  var [gameData, setGameData] = useState([]) // full dataset of games
  var [compData, setCompData] = useState([])
  var [genData, setGenData] = useState([])
  
  var [games, setGames] = useState([])  // filtered games to display
  var [comps, setComps] = useState([])
  var [gens, setGens] = useState([])

  const [term, setTerm] = useState("");

  useEffect(() => {
    if(term != ""){
      highlight(term)
    } else {
      unhighlight()
    }
  }, [games, comps, gens])

  useEffect(() => {
    fetch("https://gamehubapi.me/games/").then(
      res => res.json()
    ).then(
      data => {
        setGameData(data)
        //setGames(data)
        console.log(data)
        console.log(data.length)
      }
    ).catch(err => console.log(err))

    // get the companies (to reference for company_id)
    fetch("https://gamehubapi.me/companies/").then(
      res => res.json()
    ).then(
      data => {
        setCompData(data)
        //setComps(data)
        console.log(data)
        console.log(data.length)
      }
    ).catch(err => console.log(err))

    fetch("https://gamehubapi.me/genres/").then(
      res => res.json()
    ).then(
      data => {
        setGenData(data)
        //setGens(data)
        console.log(data)
        console.log(data.length)
      }
    ).catch(err => console.log(err))
  }, [])

  /*var gameData = require("./gamedata.json");*/

//   const [pageNumber, setPageNumber] = useState(0);

//   const gamesPerPage = 10;
//   const pagesVisited = pageNumber * gamesPerPage;

//   const options = [
//     { value: "name", text: "Title" },
//     { value: "developer", text: "Company" },
//     { value: "genre", text: "Genre" },
//     { value: "score", text: "Metascore" },
//     { value: "platforms", text: "Platforms" },
//   ];

//   const [selected, setSelected] = useState(options[0].value);

//   const orders = [
//     { value: 1, text: "Ascending" },
//     { value: -1, text: "Descending" },
//   ];

//   const [order, setOrder] = useState(orders[0].value);

//   const handleSelectChange = (event) => {
//     console.log(event.target.value);
//     setSelected(event.target.value);
//   };

//   const handleOrderChange = (event) => {
//     console.log(event.target.value);
//     setOrder(event.target.value);
//   };

  // Sort the table by attributes in the selection menu
//   function sortByProperty() {
//     var objArray = games;
//     var prop = "attributes." + selected;
//     var direct = order;
//     if (!Array.isArray(objArray))
//       throw new Error("FIRST ARGUMENT NOT AN ARRAY");
//     const clone = objArray.slice(0);
//     const propPath = prop.constructor === Array ? prop : prop.split(".");
//     clone.sort(function (a, b) {
//       for (let p in propPath) {
//         if (a[propPath[p]] && b[propPath[p]]) {
//           a = a[propPath[p]];
//           b = b[propPath[p]];
//         }
//       }
//       return a < b ? -1 * direct : a > b ? 1 * direct : 0;
//     });
//     games = clone;
//   }

//   sortByProperty();

  // search by name, new
  function searchFor(term) {
    setGames(gameData.filter(function (item) {
      return item.name.toLowerCase().includes(term.toLowerCase()) || item.description.toLowerCase().includes(term.toLowerCase())
    }))
    setComps(compData.filter(function(item){
        return item.name.toLowerCase().includes(term.toLowerCase()) || item.description.toLowerCase().includes(term.toLowerCase())
    }));
    setGens(genData.filter(function(item){
        return item.name.toLowerCase().includes(term.toLowerCase()) || item.description.toLowerCase().includes(term.toLowerCase())
    }));
  }

  function reset() {
    document.querySelector('#searched-text').value = '';
    setTerm("");
    setGames([]);
    setComps([])
    setGens([])
  }

  function unhighlight() {
    var context = document.querySelector(".container");
    var instance = new Mark(context);
    instance.unmark();
  }

  function highlight(term) {
    unhighlight();
    var context = document.querySelector(".container");
    var instance = new Mark(context);
    var options = {
      "separateWordSearch": false,
      "accuracy": "partially",
      "caseSensitive": false,
      "exclude": [".listTitleText", "#game-att"]
    }
    instance.mark(term, options); // will mark the keyword 
  }
  

  const displayGames = games
    .map((item) => {
      return (
        <Link
          to={{ pathname: "/games/gamepage" }}
          onClick={() => {
            localStorage.setItem("GAME", JSON.stringify(item));
          }}
          style={{ textDecoration: "none" }}
        >
          <div class="row row2">
            <div class="col-lg col-12">{item.name}</div>
            <div class="col-lg col-12">{compIDtoCompName(item.company_id)}</div>
            <div class="col-lg col-12">
              {genName(item.genre_id)}
            </div>
            <div class="col-lg col-12">{item.score}</div>
            <div class="col-lg col-12">
              {item.platforms.join(', ')}
            </div>
          </div>
        </Link>
      );
    });

  function compIDtoCompName(givenId) {
    for (var i = 0; i < comps.length; i++) {
      if (comps[i].id == givenId) {
        return comps[i].name;
      }
    }
  }

  // get genre name from id
  function genName(id) {
    for (var i = 0; i < gens.length; i++) {
      if (gens[i].id == id) {
        return gens[i].name;
      }
    }
  }


  const displayComps = comps
    .map((item) => {
      return (
        <Col sm={4} style={{marginBottom: '10px'}}>
            <Link to="/companies/comp" className="link-style" onClick={() => {localStorage.setItem("COMPANY", JSON.stringify(item))}} style={{ textDecoration: 'none' }}>
                <Card style={{height: '100%', width: '100%'}}>
                    <Card.Img variant="top" src={item.img} style={{objectFit: 'cover'}}/>
                    <Card.Body>
                        <Card.Title><h1>{item.name}</h1></Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>
                            Year: {item.year}
                        </ListGroupItem>
                        <ListGroupItem>
                            Location: {item.location}
                        </ListGroupItem>
                        <ListGroupItem>
                            Main Genre: {genreName(item.genre_id)}
                        </ListGroupItem>
                        <ListGroupItem>
                            <b>Total Number of Games:</b> {item.num_games}
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Link>
        </Col>
      );
    });

    function genreName(id){
        for(var i = 0; i < genData.length; i++){
            if (genData[i].id == id){
                return genData[i].name;
            }
        }
    }


    const displayGenres = gens
        // .slice(pagesVisited, pagesVisited + genresPerPage)
        .map((item) => {
            return (
                <Col sm={4} style={{ marginBottom: '10px' }}>
                    <Link to="/genrespage" className='link-style' onClick={() => { localStorage.setItem("GENRES", JSON.stringify(item)) }} style={{ textDecoration: "none" }}>
                        <Card style={{ height: '100%', width: '100%' }}>
                            <Card.Img variant="top" src={item.picture} style={{ objectFit: 'cover' }} />
                            <Card.Body>
                                <Card.Title><h1>{item.name}</h1></Card.Title>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem>
                                    <b>Games: </b> {listAllGames(item.id)}
                                </ListGroupItem>
                                <ListGroupItem>
                                    <b>Companies: </b> {listAllCompanies(item.id)}
                                </ListGroupItem>
                                <ListGroupItem>
                                    <b># Popular Games: </b> {item.num_games}
                                </ListGroupItem>
                                <ListGroupItem>
                                    <b>Topics: </b> {item.themes}
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Link>
                </Col>
            );
        });

    function listAllGames(givenId) {
        let result = "";
        for (var i = 0; i < games.length && result.length < 70; i++) {
            if (games[i].genre_id == givenId) {
                result += games[i].name + " ";
            }
        }
        return result;
    }

    function listAllCompanies(givenId) {
        let result = "";
        for (var i = 0; i < comps.length && result.length < 70; i++) {
            if (comps[i].genre_id == givenId) {
                result += comps[i].name + " ";
            }
        }
        return result;
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
        General Search
      </div>
      <br></br>
      <input type="text" name="search" id="searched-text" placeholder="Search term . . ."  value={term} onChange={(event) => {setTerm(event.target.value)}}></input>
      <button className="searchbttn" onClick={() => searchFor(term)}>Search</button>
      <button className="searchbttn" onClick={() =>{reset()}}>Reset</button>
   
        <div className="row">

          <div className="col">
            <a href="#games">
            <button class="searchbttn" id="filter">Games</button></a>
          </div>

          <div className="col">
            <a href="#companies">
              <button class="searchbttn" id="filter">Companies</button></a>
          </div>

          <div className="col">
            <a href="#genres">
            <button class="searchbttn" id="filter">Genres</button></a>
          </div>

        </div>
 
      <div class="container">
        <div className="listTitleText" id="games" style={{ animation: "fadeIn 0.5s", fontSize:60 }}>
            Games
        </div>
        <div
          className="row bg-dark text-light" 
          style={{ opacity: 0.9, borderRadius: 1, textAlign: "center" }}
        >
          <div class="col-lg col-12" id="game-att">Game Title</div>
          <div class="col-lg col-12" id="game-att">Company</div>
          <div class="col-lg col-12" id="game-att">Genre</div>
          <div class="col-lg col-12" id="game-att">Metascore</div>
          <div class="col-lg col-12" id="game-att">Platforms</div>
        </div>
        {displayGames}
        <hr style={{backgroundColor:"white", borderStyle:"solid", borderWidth:3, borderColor:"white"}}></hr>

        <div className="listTitleText" id="companies" style={{ animation: "fadeIn 0.5s", fontSize:60 }}>
            Companies
        </div>
        <Row id="hoverable">
          {displayComps}
        </Row>
        <hr style={{backgroundColor:"white", borderStyle:"solid", borderWidth:3, borderColor:"white"}}></hr>

        <div className="listTitleText" id="genres" style={{ animation: "fadeIn 0.5s", fontSize:60 }}>
            Genres
        </div>
        <div className="row">
            {displayGenres}
        </div>
        <hr style={{backgroundColor:"white", borderStyle:"solid", borderWidth:3, borderColor:"white"}}></hr>
    
      </div>
      <BackBtn></BackBtn>
    </div>
  );
};

export default GeneralSearch;