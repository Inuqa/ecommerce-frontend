import React from 'react';
import {useHistory} from 'react-router-dom';
import useValidations from '../hooks/useValidations';

const OrderNewBreadscrumb = ({step, setErrors, values, errors}) => {
  const history = useHistory();
  const {
    handleInformationValidations,
    handleShippingValidations,
  } = useValidations();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  console.log(errors);

  const handleQueryStep = (step) => {
    history.push(`/order/new?step=${step}`);
  };

  const handleStepTwo = () => {
    handleInformationValidations(setErrors, values);
    setIsSubmitting(true);
  };

  const handleStepThree = () => {
    handleShippingValidations(setErrors, values);
    handleInformationValidations(setErrors, values);
    setIsSubmitting(true);
  };

  React.useEffect(() => {
    if (Object.keys(errors).length === 0 && step === '1' && isSubmitting) {
      handleQueryStep('2');
      setIsSubmitting(false);
    }
    if (Object.keys(errors).length === 0 && step === '2' && isSubmitting) {
      handleQueryStep('3');
      setIsSubmitting(false);
    }
  }, [errors]);

  return (
    <nav>
      <ol className="breadcrumb">
        <li
          onClick={() => {
            handleQueryStep('1');
          }}
          className={`breadcrumb-item ${step === '1' ? 'active' : ''}`}
        >
          Informacion
        </li>
        <li
          onClick={() => {
            if (step === '3') {
              handleQueryStep('2');
            } else {
              handleStepTwo();
            }
          }}
          className={`breadcrumb-item ${step === '2' ? 'active' : ''}`}
        >
          Envios
        </li>
        <li
          onClick={() => {
            handleStepThree();
          }}
          className={`breadcrumb-item ${step === '3' ? 'active' : ''}`}
        >
          Pago
        </li>
      </ol>
    </nav>
  );
};

export default OrderNewBreadscrumb;
