import React, { useState } from 'react';
import Header from '../../components/manager/Header';
import SideBar from '../../components/manager/SideBar';
import Content from '../../components/manager/Content';

const ManagerDashboard = () => {

//   const addSelectedOPtion = () => {
    
//   }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-grow">
        <SideBar/>
        <main className="flex-grow bg-gray-50">
          <Content/>
        </main>
      </div>
    </div>
  );
};

export default ManagerDashboard;
