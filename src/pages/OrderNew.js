import React from 'react';
import axios from 'axios';
import useForm from '../hooks/useForm';
import {useSelector} from 'react-redux';

const OrderNew = () => {
  const {handleChange, values} = useForm({
    email: '',
    name: '',
    last_name: '',
    address: '',
    city: '',
    comuna: '',
    phone: '',
  });

  const [form, setForm] = React.useState(false);

  const cart = useSelector((state) => state.cart);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:2000/api/orders', {
      order: {
        name: values.name,
        last_name: values.last_name,
        address: values.address,
        city: values.city,
        comuna: values.comuna,
        phone: values.phone,
      },
      email: values.email,
      cart,
    },
    ).then((res) => setForm(res.data));
  };

  if (form) {
    return (
      <form action={form.url} method="post">
        <input type="hidden" name="token_ws" value={form.token} />
        <input type="submit" />
      </form>
    );
  }

  return (
    <>
      <h1>Crear order</h1>
      <fieldset>
        <form onSubmit={handleSubmit}>
          <label
            className="form-label"
            htmlFor="email"
          >
            Email
          </label>
          <input
            name="email"
            value={values.email}
            onChange={handleChange}
            className="form-control"
            type="text"
            id="email"
          />
          <label
            className="form-label"
            htmlFor="name"
          >
            Nombre
          </label>
          <input
            name="name"
            value={values.name}
            onChange={handleChange}
            className="form-control"
            type="text"
            id="name"
          />
          <label
            className="form-label"
            htmlFor="last_name"
          >
            Apellido
          </label>
          <input
            name="last_name"
            value={values.last_name}
            onChange={handleChange}
            className="form-control" type="text" id="last_name"/>
          <label
            className="form-label"
            htmlFor="address"
          >
            Direccion
          </label>
          <input
            name="address"
            value={values.address}
            onChange={handleChange}
            className="form-control"
            type="text"
            id="address"/>
          <label
            className="form-label"
            htmlFor="city"
          >
            Ciudad
          </label>
          <input
            name="city"
            value={values.city}
            onChange={handleChange}
            className="form-control"
            type="text"
            id="city"/>
          <label
            className="form-label"
            htmlFor="comuna"
          >
            Comuna
          </label>
          <input
            name="comuna"
            value={values.comuna}
            onChange={handleChange}
            className="form-control"
            type="text"
            id="comuna"/>
          <label
            className="form-label"
            htmlFor="phone"
          >
            Telefono
          </label>
          <input
            name="phone"
            value={values.phone}
            onChange={handleChange}
            className="form-control"
            type="text"
            id="phone"
          />
          <input
            className="btn btn-primary"
            type="submit"
          />
        </form>
      </fieldset>
    </>
  );
};

export default OrderNew;
