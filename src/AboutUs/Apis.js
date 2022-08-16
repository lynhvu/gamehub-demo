import "../StyleAndImg/style.css";
import igdb from "../StyleAndImg/about-page/igdb.jpg"
import rapid from "../StyleAndImg/about-page/rapidapi.jpg"
import rawg from "../StyleAndImg/about-page/rawg.jpg"

const Apis = () => {
    return (
        <div className="container">
            <div className="row card-solid" style={{margin: "5%"}}>
                
                <div className="col-sm-4 card-inside card-eff">
                <a href="https://www.igdb.com/api" className="link-style">
                    <img src={igdb} alt="IGDB API Logo"
                        style={{width: "75%"}}/>
                    <p className="text-black center" style={{margin:"4%", fontSize:"25px"}}><b>IGDB API</b></p>
                    <p className="text-black center">Used to obtain games' release dates, descriptions, media, and reviews</p></a>
                </div>

                <div className="col-sm-4 card-inside card-eff">
                    <a href="https://rapidapi.com/vicmunozr/api/video-games-trailers/" className="link-style">
                    <img src={rapid} alt="RapidAPI Logo"
                        style={{width: "75%"}}/>
                    <p className="text-black center" style={{margin:"4%", fontSize:"25px"}}><b>Video Games Trailers API</b></p>
                    <p className="text-black center">Used to obtain links to video game trailers</p></a>
                </div>

                <div className="col-sm-4 card-inside card-eff">
                    <a href="https://rawg.io/apidocs" className="link-style">
                    <img src={rawg} alt="RAWG API Logo"
                            style={{width: "75%"}}/>
                    <p className="text-black center" style={{margin:"4%", fontSize:"25px"}}><b>RAWG API</b></p>
                    <p className="text-black center">Used to obtain games' creators, genres and platforms</p></a>
                </div>

            </div>
        </div>
    )
}

export default Apis