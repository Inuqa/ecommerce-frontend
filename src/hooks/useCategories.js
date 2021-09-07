import axios from 'axios';

const useCategories = () => {
  const index = () => {
    return axios.get(
        process.env.REACT_APP_BASE_API_URL +
      `/api/admin/categories`,
        {withCredentials: true},
    );
  };

  return {index};
};

export default useCategories;
