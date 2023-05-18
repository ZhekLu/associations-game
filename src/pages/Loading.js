import React from 'react';
import './Menu.css';

export default function Loading() {
  return (
    <div className='overlay'>
      <section className='menu-body col-lg-4 col-md-4 col-sm-6 col-xs-12'>
        <h1>Loading...</h1>
      </section>
    </div>
  );
}
