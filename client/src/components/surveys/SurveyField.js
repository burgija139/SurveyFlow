import React, { forwardRef } from 'react';

const SurveyField = forwardRef(({ label, error, ...inputProps }, ref) => {
  return (
    <div>
      <label>{label}</label>
      <input {...inputProps} ref={ref} style={{ marginBottom: '5px' }} />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {error && error.message}
      </div>
    </div>
  );
});

export default SurveyField;