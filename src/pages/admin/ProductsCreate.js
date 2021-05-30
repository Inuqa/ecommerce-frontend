import React from 'react';
import ContentHeader from '../../components/ContentHeader';
import useForm from '../../hooks/useForm';
import axios from 'axios';

const ProductsCreate = () => {
  const {handleChange, values} = useForm({
    title: '',
    image: null,
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [submitStatus, setSubmitStatus] = React.useState('idle');


  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('product[title]', values.title);
    formData.append('product[master_image]', values.image);
    axios.post(
        process.env.REACT_APP_BASE_API_URL + '/api/admin/products',
        formData,
        {withCredentials: true},
    )
        .then(() => setSubmitStatus('success'))
        .catch(() => setSubmitStatus('error'));
  };

  const handleValidations = () => {
    const errors = {};

    if (!values.title) {
      errors.title = 'El titulo del producto no puede estar vacio';
    }
    if (!values.image) {
      errors.image = 'Debes incluir una imagen para crear un producto';
    }
    setErrors(errors);
  };

  React.useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      handleSubmit();
      setIsSubmitting(false);
    }
  }, [errors]);

  const handleForm = (e) => {
    e.preventDefault();
    handleValidations();
    setIsSubmitting(true);
  };

  return (
    <>
      <ContentHeader title="Crear producto"/>
      <div className="admin-content-wrapper">
        {submitStatus === 'success' &&
        <div
          className="alert alert-success"
        >
          Producto creado correctamente
        </div> }
        {submitStatus === 'error' &&
          <div
            className="alert alert-warning"
          >
          El producto no pudo ser creado intentelo mas tarde
          </div>
        }
        <fieldset>
          <form onSubmit={handleForm}>
            <label
              className="form-label"
              htmlFor="title"
            >
              Titulo
            </label>
            {errors.title && <p
              className="alert alert-warning"
            >
              {errors.title}
            </p>}
            <input
              className="form-control"
              onChange={handleChange}
              id="title"
              type="text"
              name="title"
              value={values.title}
            />
            <label
              htmlFor="image"
            >
              Imagen
            </label>
            {errors.image && <p
              className="alert alert-warning"
            >
              {errors.image}
            </p>}
            <input
              onChange={handleChange}
              name="image"
              className="form-control"
              type="file"
              accept="image/*"
            />
            <input
              className="btn btn-primary mt-2"
              type="submit"
              value="Crear"
            />
          </form>
        </fieldset>
      </div>
    </>
  );
};

export default ProductsCreate;
