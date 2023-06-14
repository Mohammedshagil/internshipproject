import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/styles.css';

const Login = () => {
  const navigate = useNavigate();
  const initialvalue = {
    username: '',
    password: '',
  };
  const [formValues, setFormValues] = useState(initialvalue);

  const [message, setMessage] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  let handleSubmit = async (e) => {
    axios
      .post('https://loginriskanalysis.azurewebsites.net/RiskManagers', {
        method: 'POST',
        name: formValues.username,
        pwd: formValues.password,
      })
      .then((response) => {
        setMessage(response.data.message);
        console.log(response.data.status);
        if (response.data.status == 'success') {
          sessionStorage.setItem('login', true);
          navigate('/alllist');
        }
      })

      .catch((error) => {
        console.error('Error signing up:', error);
      });
  };
  useEffect(() => {
    let login = localStorage.getItem('login');
    if (login) {
      navigate('/alllist');
    }
  });
  return (
    <>
      <div className='container-fluid nav_bg'>
        <div className='row'>
          <div className='col-12 mx-auto'>
            <nav
              className='navbar navbar-expand-lg navbar-light bg-primary bg-gradient
'
            >
              <div className='container-fluid'>
                <img
                  src='https://www.logosvgpng.com/wp-content/uploads/2018/03/fidelity-national-financial-fnf-logo-vector.png'
                  height='70px'
                  alt='fidelity log'
                  loading='lazy'
                />
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div>
        <div>
          <div className='heading'>
            <label className='labels display-1'>Welcome to</label>
            <br />
            <label className='labels display-1'>Risk Analysis System</label>
            <br />
          </div>

          <div className='forms card'>
            <div class='mb-3'>
              <label for='username' class='form-label'>
                Username
              </label>
              <input
                type='text'
                class='form-control'
                id='username'
                name='username'
                value={formValues.username}
                placeholder='Enter username'
                onChange={handleChange}
              />
            </div>
            <div class='mb-3'>
              <label for='password' class='form-label'>
                password
              </label>
              <input
                type='password'
                class='form-control'
                id='password'
                name='password'
                value={formValues.password}
                placeholder='Enter password'
                onChange={handleChange}
              />
            </div>
            {/* <Link to='/alllist'> */}
            <button className='btn btn-primary' onClick={handleSubmit}>
              Login
            </button>
            {/* </Link> */}
            <div className='message'>{message ? <p>{message}</p> : null}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
