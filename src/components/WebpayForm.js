import React from 'react';

const WebpayForm = ({form}) => {
  return (
    <>
      <div className="card">
        <div className="card-header">
            Resumen de la orden
        </div>
        <div className="card-body">
          <div
            className="card-text"
          >
              Numero de la orden: {form.order.id}
          </div>
          <div
            className="card-text"
          >
              total a pagar:
          </div>
        </div>
      </div>
      <form
        action={form.res.url}
        method="post">
        <input
          type="hidden"
          name="token_ws"
          value={form.res.token}
        />
        <input
          type="submit"
          value="Ir a webpay"
          className="btn btn-primary"
        />
      </form>
    </>
  );
};

export default WebpayForm;
