import axios from 'axios';

const useProducts = () => {
  const search = (queryString) => {
    return axios.get(
        process.env.REACT_APP_BASE_API_URL +
      `/api/admin/products${queryString ? queryString : ''}`,
        {withCredentials: true});
  };

  const restore = (id) => {
    return axios.get(
        process.env.REACT_APP_BASE_API_URL +
      `/api/admin/products/${id}/restore`,
        {withCredentials: true});
  };

  const remove = (id) => {
    return axios.delete(
        process.env.REACT_APP_BASE_API_URL + `/api/admin/products/${id}`,
        {withCredentials: true},
    );
  };

  const edit = (id) => {
    return axios.get(process.env.REACT_APP_BASE_API_URL +
    `/api/admin/products/${id}/edit`,
    {withCredentials: true},
    );
  };

  const editPatch = (id, params) => {
    return axios.patch(
        process.env.REACT_APP_BASE_API_URL + `/api/admin/products/${id}`,
        params,
        {withCredentials: true},
    );
  };

  return {search, restore, remove, edit, editPatch};
};
export default useProducts;
