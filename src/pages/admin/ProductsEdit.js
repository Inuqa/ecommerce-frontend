import React from 'react';
import {useParams} from 'react-router-dom';
import ContentHeader from '../../components/ContentHeader';
import AdminSpinner from '../../components/AdminSpinner';
import useForm from '../../hooks/useForm';
import useProducts from '../../hooks/useProducts';

const ProductsEdit = () => {
  const {handleChange, values, setValues} = useForm({
    title: '',
    image: null,
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [submitStatus, setSubmitStatus] = React.useState('idle');
  const [image, setImage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const {edit, editPatch} = useProducts();


  const {id} = useParams();
  React.useEffect(() => {
    getProduct();
  }, [id]);

  const handleSubmit = () => {
    setIsLoading(true);
    const formData = new FormData();
    if (values.image) {
      formData.append('product[master_image]', values.image);
    }
    formData.append('product[title]', values.title);
    editPatch(id, formData)
        .then(() => {
          setSubmitStatus('success');
          setIsLoading(false);
        })
        .catch(() => {
          setSubmitStatus('error');
          setIsLoading(false);
        });
  };

  const getProduct = () => {
    setIsLoading(true);
    edit(id)
        .then((res) => {
          setValues({title: res.data.product.title});
          setImage(res.data.image);
          setIsLoading(false);
        });
  };

  const handleValidations = () => {
    const errors = {};

    if (!values.title) {
      errors.title = 'El titulo del producto no puede estar vacio';
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
      {isLoading && <AdminSpinner />
      }
      <ContentHeader title="Editar producto"/>
      <div className="admin-content-wrapper">
        {submitStatus === 'success' &&
        <div
          className="alert alert-success"
        >
          Producto fue editado correctamente.
        </div> }
        {submitStatus === 'error' &&
          <div
            className="alert alert-warning"
          >
          El producto no pudo ser editado correctamente intentelo mas tarde.
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
              value="Editar"
            />
          </form>
        </fieldset>
        <div>
          <img src={image} alt="" />
        </div>
      </div>
    </>
  );
};

export default ProductsEdit;
