import { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form";
import Navigation from "./components/Navigation";
import 'animate.css'
function App() {
  const [wheaterData, setWheaterData] = useState({});
  const [paisData, setPaisData] = useState("");
  const [mostrarCard, setMostrarCard] = useState(false);
  const [msgError, setMsgError] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const API_KEY = "b28f2723397ffa83631027439ae40b41";

  useEffect(() => {
    wheaterApi();
  }, []);


  const wheaterApi = async () => {
    const request = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${paisData}&appid=${API_KEY}&units=metric&lang=es`
    );
    try {
      if (request.status === 200) {
        const response = await request.json();
        console.log(response);
        setWheaterData(response);
        setMostrarCard(false)
        setSpinner(true)
        setTimeout(() => {
          setSpinner(false)
          if(spinner === false ){
            setMostrarCard(true)
          }
        }, 2000)
        
      }else if(request.status === 404){
        setMsgError(true)
        setTimeout(() => { 
          setMsgError(false)
        },2000)
      }
    } catch (error) {
      console.log(error);
    }
  };

  if(paisData.trim() !== '' && paisData.value === ''){
    setSpinner(false)
    setMostrarCard(false)
    setMsgError(true)
    setTimeout(() => { 
      setMsgError(false)
    }, 2000)
  }

  const removeCard = () => {
    setMostrarCard(false)
    setSpinner(false)
  }

  return (
    <>
      <Navigation />
      <div className="text-center my-5 container">
        <Form
          setPaisData={setPaisData}
          wheaterApi={wheaterApi}
          paisData={paisData}
          msgError={msgError}
          setMsgError={setMsgError}
        />

        {
          spinner ? (
            <i className="fas fa-stroopwafel fa-spin fa-4x text-warning"></i>
          ) : null
        }

        { mostrarCard ? (
            <div className="col-sm-12 cardPrincipal animate__animated animate__fadeInRight">
            <div className="cardWheater mx-2">
                <div>
                <i onClick={removeCard} class="fas fa-arrow-left fa-2x text-danger d-flex flex-end"></i>
                </div>
              <h4>
                 {wheaterData && wheaterData.name}
                <span className="badge bg-warning mx-1">
                  {wheaterData.sys && wheaterData.sys.country}
                </span>
              </h4>
              <hr className="text-black bg-primary" />
              <p>
              T: <i className="fas fa-temperature-high fa-1x text-danger"></i> {Math.round(wheaterData.main && wheaterData.main.temp)}°C
              </p>
  
              <div class="d-flex justify-content-around">
                <p>
                  {" "}
                  Min: {Math.round(wheaterData.main && wheaterData.main.temp_min)}
                  °C
                </p>
                <p>
                  S.T:{" "}
                  {Math.round(wheaterData.main && wheaterData.main.feels_like)}°C
                </p>
                <p>
                  Max: {Math.round(wheaterData.main && wheaterData.main.temp_max)}
                  °C
                </p>
              </div>
              <p>{wheaterData.wheater && wheaterData.wheater[0].description}</p>
              <p> Humedad: {wheaterData.main && wheaterData.main.humidity}%</p>
              <span></span>
            </div>
          </div>
        ) : null}
      
       
      </div>
    </>
  );
}

export default App;
