import "../StyleAndImg/style.css";
import logo from "../StyleAndImg/logosmall.png"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink
  } from "react-router-dom";

const NavBar = () => {
    return (
        
        <nav class="navbar navbar-expand-lg navbar-dark">
            <NavLink to="/gamehub-demo"><img src={logo} alt="logo" style={{width: 70, marginLeft:10}}/></NavLink>
            <a class="navbar-brand" href="/gamehub-demo">GameHub</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <NavLink to="/gamehub-demo" activeClassName="navbar__link--active" className="navbar__link nav-item nav-link">
                        Home
                    </NavLink>

                    <NavLink to="/search" activeClassName="navbar__link--active" className="navbar__link nav-item nav-link">
                        Search
                    </NavLink>

                    <NavLink to="/games" activeClassName="navbar__link--active" className="navbar__link nav-item nav-link">
                        Games
                    </NavLink>

                    <NavLink to="/companies" activeClassName="navbar__link--active" className="navbar__link nav-item nav-link">
                        Companies
                    </NavLink>

                    <NavLink to="/genres" activeClassName="navbar__link--active" className="navbar__link nav-item nav-link">
                        Genres
                    </NavLink>
                    
                    <NavLink to="/about" activeClassName="navbar__link--active" className="navbar__link nav-item nav-link">
                        About Us
                    </NavLink>
                    
                    <NavLink to="/visualization" activeClassName="navbar__link--active" className="navbar__link nav-item nav-link">
                        Visualization
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}


export default NavBar