import React from "react";

export const Form = (props) => {
  return (
    <>
      <div className="col-md-4 col-sm-12 mx-3 my-5 cardInput">
        <label className="form-label text-white">Ingrese su país</label>
        <hr />
        <input
          type="text"
          className="form-control"
          placeholder="Buenos Aires"
          onChange={(e) => props.setPaisData(e.target.value)}
        />
        <button className="w-100 btn btn-primary my-1" onClick={props.wheaterApi}>
          Enviar
        </button>
      </div>
    </>
  );
};

export default Form;
