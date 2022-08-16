import { hover } from '@testing-library/user-event/dist/hover';

const MemberInfo = () => {
    var membersData = require('./membersData.json');
    return (
        <div className='container'>
                {membersData.map(item =>
                    <div className='row profile-card' style={{margin:"5%", marginLeft: "10%"}}>
                        <div className='col-2 col-sm-3'>
                          
                            <img src={item.picture} alt="Profile Picture"
                                style={{
                                width: "100%",
                                borderRadius: "10px",
                                animation: "glowIn 0.5s",
                                boxShadow: "0 0 20px rgba(81, 203, 238, 1)"}}/>
                        </div>
                        <div className='col-5 col-sm-5 text-black card-inside '>
                            <p className='text-light-head'><b>{item.name}</b></p>
                            <p><b>Responsibility:</b> {item.resp}</p>
                            <p><b>Major:</b> {item.major}</p>
                            <p><b>Year:</b> {item.year}</p>
                            <p>{item.about}</p>

                        </div>
                        <div className='col-3 col-sm-3 text-black card-solid'>
                            <p style={{marginTop: "15%"}}><b>Commits made:</b> {item.commits}</p>
                            <p><b>Issues resolved:</b> {item.issues}</p>
                            <p><b>Unit tests run:</b> {item.tests}</p>
                        </div>      
                    </div>
                )}
            </div>
    )
}

export default MemberInfo