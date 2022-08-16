import "../StyleAndImg/style.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const PopularTitle = (props) => {
    
    var gameData = JSON.parse(localStorage.getItem("GAME"));
    
    return (
        <div className="grid-container">
            {props.titles.map(item => (
                <div id ="grid-text" className="grid-item"> {name(item)} </div>
            ))}
        </div> 
    )

    function name(item) {
        if(item == gameData.name) {
            return (<Link to="/games/gamepage">{item}</Link>);
        } else {
            return item;
        }
    }
}

export default PopularTitle