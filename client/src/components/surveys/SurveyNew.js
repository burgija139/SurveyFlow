import React, { useState } from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

const SurveyNew = () => {
  const [showFormReview, setShowFormReview] = useState(false);
  const [formValues, setFormValues] = useState(null);

  const handleSurveySubmit = (values) => {
    setFormValues(values);
    setShowFormReview(true);
  };

  const handleCancel = () => {
    setShowFormReview(false);
  };

  return (
    <div>
      {showFormReview ? (
        <SurveyFormReview onCancel={handleCancel} formValues={formValues} />
      ) : (
        <SurveyForm onSurveySubmit={handleSurveySubmit} />
      )}
    </div>
  );
};

export default SurveyNew;