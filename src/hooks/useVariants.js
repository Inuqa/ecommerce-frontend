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

  return {edit, editPatch};
};

export default useVariants;
