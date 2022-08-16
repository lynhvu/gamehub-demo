import { useState, useEffect } from "react";
import "../StyleAndImg/style.css";
import NavBar from "../components/NavBar";
import ReactPaginate from "react-paginate";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Row, Card, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import BackBtn from "../BackBtn";

import Mark from "mark.js";


const CompanyList = (props) => {
  
    var genredata = require("../Genres/genresdata.json");
    var companydata = require("./companydata.json");
    var [data, setData] = useState([]) // all companies in dataset
    var [comps, setComps] = useState([]) // cpmpanies to display (filtered)
    const [genreData, setGens] = useState([])
    

    const [term, setTerm] = useState("");
    

    useEffect(() => {
      if(term != ""){
        highlight(term)
      } else {
        unhighlight()
      }
    }, [comps])

    useEffect(() => {
        fetch("https://gamehubapi.me/companies/").then(
            res => res.json()
        ).then(
            data => {
                setData(data)
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



  const [pageNumber, setPageNumber] = useState(0);

  const compsPerPage = 9;
  const pagesVisited = pageNumber * compsPerPage;

  // sorting options
  const options = [
    { value: "name", text: "Name" },
    { value: "year", text: "Year" },
    { value: "location", text: "Location" },
    { value: "genre_id", text: "Main Genre" },  // currently doesn't work, sorts by id instead of name
    { value: "num_games", text: "Number of Games" },
  ];
  const [selected, setSelected] = useState(options[0].value);


  const orders = [
    { value: 1, text: "Ascending (A-Z or numerical)" },
    { value: "-1", text: "Descending (Z-A or numerical)" },
  ];
  const [order, setOrder] = useState(orders[0].value);

  const handleSelectChg = (event) => {
    setSelected(event.target.value);
  };

  const handleOrderChg = (event) => {
    setOrder(event.target.value);
  };

  const genreOptions = [
    { value:"none", text:"Select a genre"},
    { value:0, text: "Action" },
    { value:1, text: "Indie" },
    { value:2, text: "Adventure" },
    { value:3, text: "RPG" },
    { value:4, text: "Strategy" },
    { value:5, text: "Shooter" },
    { value:6, text: "Casual" },
    { value:7, text: "Simulation" },
    { value:8, text: "Puzzle" },
    { value:9, text: "Arcade" },
    { value:10, text: "Platformer" },
    { value:11, text: "Racing" },
    { value:12, text: "Massively Multiplayer" },
    { value:13, text: "Sports" },
    { value:14, text: "Fighting" },
    { value:15, text: "Family" },
    { value:16, text: "Board Games" },
    { value:17, text: "Educational" },
    { value:18, text: "Card" }
  ];

  function genreName(id){
    for(var i = 0; i < genredata.length; i++){
        if (genredata[i].id === id){
            return genredata[i].name;
        }
    }
}

  sortByProperty();


// search by name, new
function searchFor(term){
  setPageNumber(0);
  setComps(companydata.filter(function(item){
    
    return item.name.toLowerCase().includes(term.toLowerCase()) || item.description.toLowerCase().includes(term.toLowerCase())
   
  }));

  
}

function highlight(term) {
  unhighlight();
  var context = document.querySelector(".container"); // requires an element with class "context" to exist
  var instance = new Mark(context);
  var options = {
    "separateWordSearch": false,
    "accuracy": "partially",
    "caseSensitive": false,
  }
  instance.mark(term, options); // will mark the keyword 
}

function unhighlight() {
  var context = document.querySelector(".container"); // requires an element with class "context" to exist
  var instance = new Mark(context);
  instance.unmark(); // will mark the keyword 
}

function reset(){
  setPageNumber(0);
  document.querySelector('#searched-text').value = '';
  setTerm("");
  setComps(data);
}

function applyFilters(startChar, endChar, startYear, endYear, location, genreID, minGames, maxGames){
  setComps(companydata.filter(function(item){
    var qualifies = true;
    if(startChar && endChar){
      qualifies &= item.name.charAt(0).toLowerCase() >= startChar.toLowerCase() && item.name.charAt(0).toLowerCase() <= endChar.toLowerCase();
    }
    if(startYear && endYear){
      qualifies &= item.year >= startYear && item.year <= endYear;
    }
    if(location){
      qualifies &= item.location.toLowerCase() === location.toLowerCase();
    }
    if(genreID !== "none"){
      qualifies &= item.genre_id == genreID;
    }
    if(minGames || maxGames){
      qualifies &= item.num_games >= minGames && item.num_games <= maxGames;
    }
    return qualifies;
  }));
}


  const displayComps = companydata
    .slice(pagesVisited, pagesVisited + compsPerPage)
    .map((item) => {
      return (
        <Col sm={4} className="mb-4 align-content-center">
            <Link to="/companies/comp" className="link-style" onClick={() => {localStorage.setItem("COMPANY", JSON.stringify(item))}} style={{ textDecoration: 'none' }}>
                <Card style={{height: '100%', width: '100%'}}>
                    <Card.Img variant="top" src={item.img} style={{objectFit: 'cover'}}/>
                    <Card.Body>
                        <Card.Title><h1 id="namecomp">{item.name}</h1></Card.Title>
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

  const pageCount = Math.ceil(companydata.length / compsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  function clearValues() {
    document.getElementById("startChar").value = ''
    document.getElementById("endChar").value = ''
    document.getElementById("startYear").value = ''
    document.getElementById("endYear").value = ''
    document.getElementById("location").value = ''
    document.getElementById("selectGenre").value = "none"
    document.getElementById("minGames").value = ''
    document.getElementById("maxGames").value = ''
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
        Companies
      </div>
      <br></br>

      {/* Search Options */}
      <input type="text" name="search" id="searched-text" placeholder="Search Companies"
        value={term} onChange={(event) => {setTerm(event.target.value)}}></input>
      <button className="searchbttn" id="inputbttn" onClick={() => {searchFor(term)}}>Search</button>
      <button className="searchbttn" onClick={() => {reset()}}>Reset</button>

      {/* Filter options */}
      <button class="searchbttn" id="filter" data-toggle="modal" data-target="#exampleModal">
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
              Names (Starting letter to ending letter, filter by alphabetical order):<br></br>
              <input type="text" name="startChar" id="startChar" placeholder="A" maxlength="1"></input>
              &nbsp;-&nbsp;
              <input type="text" name="endChar" id="endChar" placeholder="Z" maxlength="1"></input>
              <br></br><br></br>
              Year Established:
              <br></br>
              <input type="number" name="startYear" id="startYear" placeholder="Start" maxlength="4"></input>
              &nbsp;-&nbsp;
              <input type="number" name="endYear" id="endYear" placeholder="End" maxlength="4"></input>
              <br></br><br></br>
              Location:&nbsp;
              <input type="text" name="location" id="location" placeholder="Example: USA" maxlength="20"></input>
              <br></br><br></br>
              Genre:
              <select id="selectGenre">
                {genreOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
              <br></br><br></br>
              Number of Games:
              <br></br>
              <input type="number" name="minGames" id="minGames" placeholder="Min. # Games" maxlength="4"></input>
              &nbsp;-&nbsp;
              <input type="number" name="maxGames" id="maxGames" placeholder="Max. # Games" maxlength="4"></input>



            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-secondary" onClick={() => clearValues()}>Clear</button>
              <button type="button" class="btn btn-primary" onClick={() => applyFilters(
                document.getElementById("startChar").value, 
                document.getElementById("endChar").value,
                document.getElementById("startYear").value, 
                document.getElementById("endYear").value,
                document.getElementById("location").value,
                document.getElementById("selectGenre").value,
                document.getElementById("minGames").value,
                document.getElementById("maxGames").value)}>Save changes</button>
            </div>
          </div>
        </div>
      </div>

      {/* Sorting options */}
      <div className="row mb-2">
        <div className="col justify-items-center">
          <div id="search-sort">Sort by:</div>
          <div className="form-container">
            <select className="form-select" value={selected} onChange={handleSelectChg}>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
          </div>
          <div className="form-container">
              <select className="form-select" value={order} onChange={handleOrderChg}>
              {orders.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>


      <div class="container justify-items-center">
        <Row id="hoverable">
          {displayComps}
        </Row>
      </div>
      <div className="container justify-items-center">
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

  function sortByProperty() {
    var objArr = comps;
    var prop = "attributes." + selected;
    var dir = order;

    if (!Array.isArray(objArr)) throw new Error("FIRST ARGUMENT NOT AN ARRAY");

    const clone = objArr.slice(0);
    const propPath = prop.constructor === Array ? prop : prop.split(".");

    clone.sort(function (a, b) {
      for (let p in propPath) {
        if (a[propPath[p]] && b[propPath[p]]) {
          a = a[propPath[p]];
          b = b[propPath[p]];
        }
      }

      return a < b ? -1 * dir : a > b ? 1 * dir : 0;
    });
    // update the data
    comps = clone;
  }
};

export default CompanyList;
