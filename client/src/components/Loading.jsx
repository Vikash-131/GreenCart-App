import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Loading = () => {

  const { navigate } = useAppContext(); 
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  // support both `next` and `ordernext` query param names (server may use either)
  const nextUrl = query.get('next') || query.get('ordernext');

  useEffect(() => {
    if (nextUrl) {
      const timer = setTimeout(() => {
        navigate(`/${nextUrl}`);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [nextUrl]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-primary"></div>
      <p className="mt-4 text-gray-600">Processing, please wait...</p>
    </div>
  );
};

export default Loading;
