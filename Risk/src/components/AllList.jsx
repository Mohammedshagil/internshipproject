import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import Navigations from './Navigations';
import '../styles/styles.css';
import Tables from './Tables';
import { useNavigate } from 'react-router-dom';
import Filters from './Filters';

function AllList(props) {
  const msg = 'Favourite';
  const navigate = useNavigate();

  let login = sessionStorage.getItem('login');
  console.log(login);

  useEffect(() => {
    let login = sessionStorage.getItem('login');
    if (!login) {
      navigate('/');
    }
  });

  return (
    <>
      <Navigations data={msg} />
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-5'></div>
          <div className='col-7'>
            <label className='colsdisplay'>List of applications</label>
          </div>
        </div>
      </div>
      <Filters />
    </>
  );
}
export default AllList;
