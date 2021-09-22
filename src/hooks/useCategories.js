import axios from 'axios';

const useCategories = () => {
  const normalIndex = () => {
    return axios.get(
        process.env.REACT_APP_BASE_API_URL +
      '/api/categories',
    );
  };

  const normalCategoriesShow = (category) => {
    return axios.get(
        process.env.REACT_APP_BASE_API_URL +
        `/api/categories/${category}`,
    );
  };

  const index = () => {
    return axios.get(
        process.env.REACT_APP_BASE_API_URL +
      `/api/admin/categories`,
        {withCredentials: true},
    );
  };

  return {index, normalIndex, normalCategoriesShow};
};

export default useCategories;
