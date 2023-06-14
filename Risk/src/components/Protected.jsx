import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom/dist';

function Protected(props) {
  const { Component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    let login = sessionStorage.getItem('login');
    if (!login) {
      navigate('/');
    }
  });

  return (
    <div>
      <Component />
    </div>
  );
}

export default Protected;
