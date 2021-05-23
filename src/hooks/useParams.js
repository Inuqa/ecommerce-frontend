const useParams = (params) => {
  const serialize = (params) => {
    const str = [];
    Object.entries(params).forEach(([key, val]) => {
      str.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
    });
    return str.join('&');
  };
  return serialize(params);
};

export default useParams;
