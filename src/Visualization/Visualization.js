import NavBar from '../components/NavBar';
import "../StyleAndImg/style.css";
import { useState, useEffect } from "react";
import { LineChart, Line, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, PieChart, Pie, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

//https://observablehq.com/@d3/gallery - gallery of possible d3 visualizations
//https://recharts.org/en-US/examples

const Visualization = (props) => {

  const colors = ['#9e5827', '#98da1d', '#fc3ebf', '#28dce1', '#135eb0', '#fcc1fb', '#0f6e00','#91207b', '#c9d9c1', '#7c8869', '#3c4c1e', '#4959ea', '#e1d923', '#38e515', '#69affc', '#d16dbe', '#eea979', '#60af66', '#9a31e2', '#5a3e4f', '#ca2c17',]
  const [jobs, setJobs] = useState([])
  const jMap = new Map()
  const [locs, setLocs] = useState([])
  const lMap = new Map()
  const [comps, setComps] = useState([])
  const cMap = new Map()
  var jArr
  var lArr
  var cArr

  useEffect(() => {
    fetch("http://idb-3-354621.uc.r.appspot.com/jobs/")
//    fetch("http://localhost:5000/jobs/")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data["Jobs"]);
        console.log(data["Jobs"]);
        console.log(data["Jobs"].length);
      })
      .catch((err) => console.log(err));
    fetch("http://idb-3-354621.uc.r.appspot.com/locations/")
//    fetch("http://localhost:5000/locs/")
      .then((res) => res.json())
      .then((data) => {
        setLocs(data["Locations"]);
        console.log(data["Locations"]);
        console.log(data["Locations"].length);
      })
      .catch((err) => console.log(err));
    fetch("http://idb-3-354621.uc.r.appspot.com/companies/")
//    fetch("http://localhost:5000/comps/")
      .then((res) => res.json())
      .then((data) => {
        setComps(data["Companies"]);
        console.log(data["Companies"]);
        console.log(data["Companies"].length);
      })
      .catch((err) => console.log(err));
}, []);

// function for counting number of jobs per category
function jobData() {
  jobs.map((item) => {
    if (jMap.get(item["category"]) !== undefined) {
      jMap.set(item["category"], (jMap.get(item["category"])) + 1)
    } else {
      jMap.set(item["category"], 1)
    }
  });
};

// function for counting number of jobs per city
function locsData() {
  locs.map((item) => {
    if (lMap.get(item["city"]) !== undefined) {
      lMap.set(item["city"], (lMap.get(item["city"])) + item["jobs"].length)
    } else {
      lMap.set(item["city"], item["jobs"].length)
    }
  });
};

// function for counting number of companies per industry
function compsData() {
  comps.map((item) => {
    if (cMap.get(item["industry"]) !== undefined) {
      cMap.set(item["industry"], (cMap.get(item["industry"])) + 1)
    } else {
      cMap.set(item["industry"], 1)
    }
  });
};

// function for changing from maps into arrays of arrays
function toArrays() {
  jArr = Array.from(jMap, ([category, value]) => ({'Category': category, 'Jobs': value}))
  lArr = Array.from(lMap, ([city, value]) => ({'City': city, 'Jobs': value}))
  cArr = Array.from(cMap, ([industry, value]) => ({'Industry': industry, 'Companies': value}))
}

jobData()
locsData()
compsData()
toArrays()
  
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
            Visualizations
          </div>
          <br></br>
          <div className="container">
            <h2 className="chart-title" style={{color: 'white'}}>Number of Jobs Per Category</h2>
            <br/>
            <div className="d-flex justify-content-center" style={{background: "black"}}>
              <BarChart
                width={1100}
                height={500}
                data={jArr}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="Category"/>
                  <YAxis/>
                  <Legend/>
                  <Tooltip/>
                  <Bar type="monotone" dataKey="Jobs" fill="#FFFFFF"/>
                </BarChart>
            </div>
            <br/>
            <h2 className="chart-title" style={{color: 'white'}}>Number of Jobs Per City</h2>
            <br/>
            <div className="d-flex justify-content-center">
              <PieChart
                width={850}
                height={850}>
                  <Legend/>
                  <Pie
                    data={lArr}
                    dataKey="Jobs"
                    nameKey="City"
                    outerRadius={350}
                    cx='50%'
                    cy='50%'
                    fill='white'
                    label>
                      {lArr.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                  </Pie>
                  <Tooltip/>
              </PieChart>
            </div>
            <br/>
            <br/>
            <h2 className="chart-title" style={{color: 'white'}}>Number of Companies Per Industry</h2>
            <br/>
            <div className="d-flex justify-content-center" style={{background: "black"}}>
            <LineChart
                width={1100}
                height={500}
                data={cArr}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="Industry"/>
                  <YAxis/>
                  <Legend/>
                  <Tooltip/>
                  <Line type="monotone" dataKey="Companies" stroke="#FFFFFF" strokeWidth={3} activeDot={{ r: 8 }}/>
                </LineChart>
            </div>
          </div>
        </div>)
};

export default Visualization;
