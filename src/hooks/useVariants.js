import axios from 'axios';

const useVariants = () => {
  const edit = (productId, id) => {
    return axios.get(process.env.REACT_APP_BASE_API_URL +
      `/api/admin/products/${productId}/variants/${id}/edit`,
    {withCredentials: true},
    );
  };

  const editPatch = (productId, id, params) => {
    return axios.patch(process.env.REACT_APP_BASE_API_URL +
      `/api/admin/products/${productId}/variants/${id}`,
    params,
    {withCredentials: true},
    );
  };

  const index = (productId) => {
    return axios.get(process.env.REACT_APP_BASE_API_URL +
      `/api/admin/products/${productId}/variants`,
    {withCredentials: true},
    );
  };

  const remove = (productId, id) => {
    return axios.delete(process.env.REACT_APP_BASE_API_URL +
      `/api/admin/products/${productId}/variants/${id}`,
    {withCredentials: true},
    );
  };

  const restore = (productId, id) => {
    return axios.get(process.env.REACT_APP_BASE_API_URL +
      `/api/admin/products/${productId}/variants/${id}/restore`,
    {withCredentials: true},
    );
  };

  return {index, edit, editPatch, restore, remove};
};

export default useVariants;
