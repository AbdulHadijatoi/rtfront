import { Button } from '@mui/material';
import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const ReCaptcha = () => {
  const [recaptchaValue, setRecaptchaValue] = useState(null);

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
    console.log("ReCAPTCHA value:", value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (recaptchaValue) {
      // Proceed with form submission
      // console.log("Form submitted");
    } else {
      console.error("Please complete the reCAPTCHA");
    }
  };

  return (
    <form onSubmit={handleSubmit} >
      <ReCAPTCHA
        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
        onChange={handleRecaptchaChange}
        style={{width:'100px'}}
      />

    </form>
  );
};

export default ReCaptcha;
