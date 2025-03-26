import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as actions from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey }) => {
  const navigate = useNavigate();

  const reviewFields = Object.keys(formValues).map((name) => (
    <div key={name}>
      <label>{name}</label>
      <div>{formValues[name]}</div>
    </div>
  ));

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button className="yellow darken-3 white-text btn-flat" onClick={onCancel}>
        Back
      </button>
      <button
        onClick={() => submitSurvey(formValues, navigate)}
        className="green btn-flat right white-text"
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

export default connect(null, actions)(SurveyFormReview);