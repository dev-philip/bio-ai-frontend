import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';



const HeaderComponent: React.FC = () => {
  
  const navigate = useNavigate();


  return (
    <>
      <header className="bg-indigo-600 text-white shadow-md sticky top-0 z-50">
  
      </header>

    </>
  
  );
};

export default HeaderComponent;
