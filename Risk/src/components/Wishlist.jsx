import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/styles.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Navigations from './Navigations';
//import Data from '../data/data.json';
//const API = 'https://riskanalysis.azurewebsites.net/Mortgage/GetAllValues';

const Wishlists = (props) => {
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [wishname, setWishname] = useState([]);
  const [wishnamelist, setWishnamelist] = useState([]);
  const [displays, setDisplays] = useState('');
  useEffect(() => {
    fetchUser();
    fetchlist();
  }, []);

  const wish = location.state.wishnames;
  const navigate = useNavigate();
  const fetchUser = () => {
    console.log(wish);
    fetch(
      `https://riskanalysis.azurewebsites.net/Mortgage/GetFinalWishLists?wishlistname=${wish}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setWishname(data);
      });
  };
  const fetchlist = () => {
    fetch(
      'https://riskanalysis.azurewebsites.net/mortgage/GetWishlistnamesonly'
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setWishnamelist(data);
      });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firsIndex = lastIndex - recordsPerPage;
  const records = users.slice(firsIndex, lastIndex);
  const npage = Math.ceil(users.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  function NextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }
  function prevPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function changeCurPage(id) {
    setCurrentPage(id);
  }

  function passValues(ids) {
    navigate('/report', { state: { ids } });
  }
  function passwishname(wishnames) {
    navigate('/WishLists', { state: { wishnames } });
  }

  return (
    <>
      <Navigations />
      <div className='container'>
        <div className='row'>
          <div className='col-2'></div>
          <div className='col-7'>
            <label className='label display-3'>WishList name : {wish}</label>
          </div>
        </div>
      </div>
      <div>
        <div class='container'>
          <div class='row'>
            <div className='col-2'>
              <div
                className='card text-white bg-primary mb-3'
                style={{ maxwidth: 18 + 'rem' }}
              >
                <div className='card-header'>Filter</div>
                <div className='card-body'>
                  <h5 className='card-title'>Info card title</h5>
                  <p className='card-text'>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
              </div>
            </div>

            <div class='col-7'>
              <table className=' table table-bordered border-primary'>
                <thead>
                  <tr>
                    <th>application_ID</th>
                    <th>buyer's name</th>
                    <th>mortgage amount</th>
                    <th>date</th>
                    <th>risk analysis</th>
                  </tr>
                </thead>

                {wishname.length > 0 && (
                  <tbody>
                    {wishname.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.amount}</td>
                        <td>{user.date}</td>
                        <td>
                          <button onClick={() => passValues(user.appId)}>
                            Risk analysis
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
              <nav className='pages-change'>
                <ul className='pagination'>
                  <li className='page-item'>
                    <a href='#' className='page-link' onClick={prevPage}>
                      Prev
                    </a>
                  </li>
                  {numbers.map((n, i) => (
                    <li
                      className={`page-item ${
                        currentPage === n ? 'active' : ''
                      }`}
                      key={i}
                    >
                      <a
                        href='#'
                        className='page-link'
                        onClick={() => changeCurPage(n)}
                      >
                        {n}
                      </a>
                    </li>
                  ))}
                  <li className='page-item'>
                    <a href='#' className='page-link' onClick={NextPage}>
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className='col-2'>
              {wishnamelist.length > 0 && (
                <ul>
                  {wishnamelist.map((wish) => (
                    <li key={wish.name}>
                      <button
                        className='btn btn-primary'
                        onClick={() => passwishname(wish.name)}
                      >
                        {wish.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <Report dataId={getid} /> */}
    </>
  );
};
export default Wishlists;
