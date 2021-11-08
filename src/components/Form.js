import React from "react";

export const Form = (props) => {



  return (
    <>
      <div className="col-sm-12 cardInput my-3  animate__animated animate__fadeInDown">
        <h4>Ingrese nombre de su ciudad</h4>
        <hr className="bg-primary" />
        <input
          type="text"
          className="form-control"
          placeholder="Buenos Aires"
          onChange={(e) => props.setPaisData(e.target.value)}
        />
        {props.msgError ? (
          <div class="alert alert-danger animate__animated animate__fadeInUp my-1" role="alert">
            <i class="fas fa-exclamation-circle text-danger "></i> Ingrese una ciudad válida.
          </div>
        ) : null}
        <button
          className="w-100 btn btn-primary my-1"
          onClick={props.wheaterApi}
        >
          Enviar
        </button>
      </div>
    </>
  );
};

export default Form;
