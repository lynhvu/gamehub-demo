import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
const BackBtn = () => {
    return (
        <Link to="" onClick={ () => (window.history.back())}>
            <div className="animated-button">
                <span />
                <span />
                <span />
                <span />
                Back
            </div>
        </Link>
    )
}

export default BackBtn