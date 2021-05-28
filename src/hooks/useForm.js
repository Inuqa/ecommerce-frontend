import {useState} from 'react';

const useForm = (props) => {
  const [values, setValues] = useState(props);

  const handleChange = (e) => {
    const {name, value} = e.target;

    setValues({...values,
      [name]: value});
  };
  return {handleChange, values};
};

export default useForm;
