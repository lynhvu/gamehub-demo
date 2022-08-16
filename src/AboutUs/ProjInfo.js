import "../StyleAndImg/style.css";

const ProjInfo = (props) => {
    var stats = require('./totalStats.json');
    return (   
        <div className="container">
            <div className="row card-solid" id="total-stats" style={{margin: "5%"}}>
                <h1>Group Stats</h1>    
                    {stats.map(item =>
                    <div className='col card-inside'>
                        <p>{item.type}</p>
                        <h1>{item.number}</h1>
                        
                    </div>
                )}
            </div>
            <div className="row card-solid" id="total-stats" style={{margin: "5%"}}> 

                <div className="col card-inside d-inline-flex align-items-center justify-content-center card-eff">
                    <a href="https://documenter.getpostman.com/view/21597654/UzBsHPx7" className="link-style">Postman</a>
                </div> 

                <div className="col card-inside d-inline-flex align-items-center justify-content-center card-eff">
                    <a href="https://gitlab.com/lynhvu138/cs373-idb/-/issues" className="link-style">GitLab Issue Tracker</a>
                </div> 

                <div className="col card-inside d-inline-flex align-items-center justify-content-center card-eff">
                    <a href="https://gitlab.com/lynhvu138/cs373-idb" className="link-style">Gitlab Repo</a>
                </div> 

                <div className="col card-inside d-inline-flex align-items-center justify-content-center card-eff">
                    <a href="https://gitlab.com/lynhvu138/cs373-idb/-/wikis/home" className="link-style">GitLab Wiki</a>
                </div> 

            </div>
        </div>
    )
}

export default ProjInfo