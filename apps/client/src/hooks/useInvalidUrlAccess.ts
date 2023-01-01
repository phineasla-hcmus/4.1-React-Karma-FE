import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import LocationContext from '../context/LocationProvider';

const PUBLIC_ALLOWED_ROUTES = ['/', '/login', '/forgot-password'];

function useInvalidUrlAccess() {
  const currentLocation = useLocation();
  const navigate = useNavigate();
  const { lastVisitedLocation } = useContext(LocationContext);

  useEffect(() => {
    if (
      lastVisitedLocation.current === null &&
      !PUBLIC_ALLOWED_ROUTES.includes(currentLocation.pathname)
    ) {
      navigate('/');
    }
  }, []);
}

export default useInvalidUrlAccess;
