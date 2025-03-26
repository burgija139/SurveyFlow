// filepath: /home/burgija/Desktop/Kursevi/projekti/node react email survey project/server/client/src/components/surveys/SurveyForm.js
import _ from 'lodash';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import formFields from './formFields';

const SurveyForm = ({ onSurveySubmit }) => {
  const { handleSubmit, control, formState: { errors } } = useForm();

  const validateEmails = (emails) => {
    const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\],;:\s@"]+\.)+[^<>()[\],;:\s@"]{2,})$/i;
    const invalidEmails = emails
      .split(',')
      .map(email => email.trim())
      .filter(email => re.test(email) === false);

    if (invalidEmails.length) {
      return `These emails are invalid: ${invalidEmails.join(', ')}`;
    }

    return true; // Return true if validation passes
  };


  const renderFields = () => {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Controller
          key={name}
          name={name}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <SurveyField {...field} label={label} error={errors[name]} />
          )}
          rules={{
            required: 'This field is required',
            ...(name === 'recipients' && {
              validate: value => validateEmails(value) === true || validateEmails(value),
            }),
          }}
        />
      );
    });
  };

  const onSubmit = (data) => {
    onSurveySubmit(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {renderFields()}
        <Link to="/surveys" className="red btn-flat white-text">Cancel</Link>
        <button type="submit" className="teal btn-flat right white-text">Next
          <i className="material-icons right">done</i>
        </button>
      </form>
    </div>
  );
};

export default SurveyForm;