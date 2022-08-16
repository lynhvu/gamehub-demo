import "../StyleAndImg/style.css";
import discord from "../StyleAndImg/about-page/discord.jpg"
import figma from "../StyleAndImg/about-page/figma.jpg"
import gcp from "../StyleAndImg/about-page/gcp.jpg"
import gitlab from "../StyleAndImg/about-page/gitlab.jpg"
import notion from "../StyleAndImg/about-page/notion.jpeg"
import postman from "../StyleAndImg/about-page/postman.jpg"

const Tools = () => {
    return (
        <div className="container">
            <div className="row card-solid" style={{margin: "5%"}}>
                <div className="col-sm-4 card-inside card-eff">   
                    <a href="https://discord.com/" className="link-style">
                    <img src={discord} alt="Discord Logo"
                        style={{width: "75%"}}/>
                    <p className="text-black center" style={{margin:"4%", fontSize:"25px"}}><b>Discord</b></p>
                    <p className="text-black center">Team messaging platform</p>
                    </a>
                </div>

                <div className="col-sm-4 card-inside card-eff">
                    <a href="https://figma.com/" className="link-style">
                    <img src={figma} alt="Figma Logo"
                        style={{width: "75%"}}/>
                    <p className="text-black center" style={{margin:"4%", fontSize:"25px"}}><b>Figma</b></p>
                    <p className="text-black center">Designing tool for front end</p></a>
                </div>

                <div className="col-sm-4 card-inside card-eff">
                    <a href="https://gitlab.com/" className="link-style">
                    <img src={gitlab} alt="GitLab Logo"
                        style={{width: "75%"}}/>
                    <p className="text-black center" style={{margin:"4%", fontSize:"25px"}}><b>GitLab</b></p>
                    <p className="text-black center">Git repository manager</p></a>
                </div>
                
                <div className="col-sm-4 card-inside card-eff">
                    <a href="https://console.developers.google.com/" className="link-style">
                    <img src={gcp} alt="GCP Logo"
                            style={{width: "75%"}}/>
                    <p className="text-black center" style={{margin:"4%", fontSize:"25px"}}><b>Google Cloud Platform</b></p>
                    <p className="text-black center">Cloud computing platform and website deployment</p></a>
                </div>

                <div className="col-sm-4 card-inside card-eff">
                    <a href="https://notion.so/" className="link-style">
                    <img src={notion} alt="Notion Logo"
                        style={{width: "75%"}}/>
                    <p className="text-black center" style={{margin:"4%", fontSize:"25px"}}><b>Notion</b></p>
                    <p className="text-black center">Project management and planning tool</p></a>
                </div>

                <div className="col-sm-4 card-inside card-eff">
                    <a href="https://postman.com/" className="link-style">
                    <img src={postman} alt="Postman Logo"
                            style={{width: "75%"}}/>
                    <p className="text-black center" style={{margin:"4%", fontSize:"25px"}}><b>Postman</b></p>
                    <p className="text-black center">API platform for building and testing APIs</p></a>
                </div>
                
            </div>
        </div>
    )
}

export default Tools