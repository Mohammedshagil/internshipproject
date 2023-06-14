import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import Navigations from './Navigations';
import '../styles/styles.css';
import Tables from './Tables';
import { useNavigate } from 'react-router-dom';
const Views = () => {
  return (
    <>
      <Navigations />
    </>
  );
};
export default Views;
