import { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [wheaterData, setWheaterData] = useState({});
  const [paisData, setPaisData] = useState("");
  const API_KEY = "b28f2723397ffa83631027439ae40b41";
  // const pais = "Buenos Aires";

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
        console.log();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
    
      <div className="text-center my-5 row">
      <div className="col-md-4 col-sm-12">
        <label className="form-label">Ingrese su país</label>
        <input type="text" className="form-control" placeholder="Buenos Aires" onChange={(e) => setPaisData(e.target.value)}/>
        <button className="w-100 btn btn-primary" onClick={wheaterApi}>Enviar</button>
      </div>
        <div className="container col-md-7 col-sm-12">
          <h2 className="mb-5 ">Wheater App</h2>
          <div className="cardWheater mx-2">
            <h4>
              {wheaterData && wheaterData.name}
              <span className="badge bg-warning mx-1">
                {wheaterData.sys && wheaterData.sys.country}
              </span>
            </h4>
            <hr className="text-black" />
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
       
      </div>
    
      <footer className="bg-dark p-5 text-light text-center">
        Developed by Sebastian Mosquera with 
      </footer>
    </div>
  );
}

export default App;
