import React from 'react';
import { Navigate } from 'react-router-dom';


const Protect = ({ children }) => {
   const token = localStorage.getItem('token'); // Correct capitalization

   if (!token || token==null  ) {
      return <Navigate to="/" />;
   }

   return <>{children}</>; // Render children components
}

export default Protect;
