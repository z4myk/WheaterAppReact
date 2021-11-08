import { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form";
import 'animate.css'
function App() {
  const [wheaterData, setWheaterData] = useState({});
  const [paisData, setPaisData] = useState("");
  const [mostrarCard, setMostrarCard] = useState(false)
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
        setMostrarCard(true)
        
      }else if(request.status === 404){
        alert('Ingrese un pais valido')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
    
      <div className="text-center my-5 container">
        <Form
          setPaisData={setPaisData}
          wheaterApi={wheaterApi}
          paisData={paisData}
        />
        { mostrarCard ? (
            <div className="col-sm-12  animate__animated animate__fadeInRight">
            <div className="cardWheater mx-2">
              <h4>
                {wheaterData && wheaterData.name}
                <span className="badge bg-warning mx-1">
                  {wheaterData.sys && wheaterData.sys.country}
                </span>
              </h4>
              <hr className="text-black bg-primary p-1" />
              <p>
                Temp: {Math.round(wheaterData.main && wheaterData.main.temp)}°C
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
    </div>
  );
}

export default App;
