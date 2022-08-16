import {useState, useEffect} from 'react'
import "../StyleAndImg/style.css";
import PopularTitles from "./PopularTitles";
import NavBar from "../components/NavBar";
import BackBtn from "../BackBtn";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const IndividualCompany = (props) => {
    var compData = JSON.parse(localStorage.getItem("COMPANY"));
    var genredata = require('../Genres/genresdata.json');
    var gamedata = require('../GamePages/gamedata.json');
    var [genreData, setGenreData] = useState([]);

    var [gameData, setGameData] = useState([]);


    useEffect(() => {
        fetch("/gamedata/").then(
            res => res.json()
        ).then(
            data => {
                setGameData(data)
                console.log(data)
            }
        )
    }, [])

    useEffect(() => {
        fetch("/genresdata/").then(
            res => res.json()
        ).then(
            data => {
                setGenreData(data)
                console.log(data)
            }
        )
    }, [])

    function genreName(id){
        for(var i = 0; i < genredata.length; i++){
            if (genredata[i].id == id){
                return (<Link to="/genrespage" onClick={() => {localStorage.setItem("GENRES", JSON.stringify(genredata[i]))}}>{genredata[i].name}</Link>);
            }
        }
    }

    function gameName(item){
        return (<Link to="/games/gamepage" onClick={() => {localStorage.setItem("GAME", JSON.stringify(item))}}>{item.name}</Link>);
    }

    // returns the matching games for this company
    function getAllGames(id){
        const result = [];
        for(var i = 0; i < gamedata.length; i++){
            if(gamedata[i].company_id == id){
                result.push(gamedata[i]);
            }
        }
        return result;
    }


    
    return (
        <div className='page default-bg'>
            <link rel="stylesheet" href="style.css" type="text/css" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
            <link
                href="https://fonts.googleapis.com/css2?family=Space+Mono&display=swap"
                rel="stylesheet"
            />

            <NavBar></NavBar>
            <div className="container">
                <div className="row"> 
                 
                        <div className="listTitleText" style={{ animation: "fadeIn 0.5s" }}>
                            {compData.name}
                        </div>
                        <img className="d-block w-100" style={{marginBottom: '15px'}} src={compData.img}/><br></br>
                        <p class="game-descr">Description: <p id ="comp-descr">{compData.description}</p></p>
                        <p class="game-descr">Founded in: {compData.year}</p>
                        <p class="game-descr">Based in: {compData.location}</p>
                        <p class="game-descr">Number of Games: {compData.num_games}</p>
                        <p class="game-descr">Main Genre: &nbsp; 
                            {<div> {genreName(compData.genre_id)}&nbsp;</div>}</p>
                 

               
                        <p className='game-descr'>Popular Titles:
                        <div>{getAllGames(compData.id).map(item => (
                             <div style={{float:"left"}}> {gameName(item)}&nbsp;</div>
                        ))}</div></p>
                        {/* <PopularTitles titles = {getAllGames(compData.id)} gameData = {gameData}></PopularTitles> */}
                 

                </div>
            </div>
            
            <BackBtn></BackBtn>
        </div>
    )
}

export default IndividualCompany