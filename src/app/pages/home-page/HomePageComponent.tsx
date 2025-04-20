import React, { useState, useEffect } from 'react';
import styles from './HomePageComponent.module.css'; //style

import { useNavigate } from 'react-router-dom';

const HomePageComponent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className={`${styles.bodycontent} text-gray-600 body-font`}>
      {/* Search Bar */}
      <h2>Home Page</h2>

    </section>
  );
};

export default HomePageComponent;
