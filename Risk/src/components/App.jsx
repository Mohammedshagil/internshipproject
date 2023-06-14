import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllList from './AllList';
import Favourite from './Favourite';
import Login from './Login';
import Protected from './Protected';
import { useNavigate } from 'react-router-dom';
import Report from './Report';
import Wishlist from './Wishlist';
import ViewList from './ViewList';
import Filters from './Filters';
const App = () => {
  sessionStorage.setItem('logs', false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/alllist' element={<Protected Component={AllList} />} />
        <Route
          path='/favourite'
          element={<Protected Component={Favourite} />}
        />
        <Route path='/Report' element={<Protected Component={Report} />} />
        <Route path='/Wishlists' element={<Protected Component={Wishlist} />} />
        <Route path='/Filters' element={<Protected Component={Filters} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
