import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes';
import ManagerRoutes from './routes/ManagerRoutes';
import AdminRoutes from './routes/AdminRoutes';


function App() {
  return (
    // <div className="App">
    //   <UserLogin/>
    //   <Signup/>
    // </div>
    <Router>
      <Routes>
      <Route path="/*" element={<UserRoutes/>} />
      <Route path="/manager/*" element={<ManagerRoutes/>} />
      <Route path="/admin/*" element={<AdminRoutes/>} />
      </Routes>
    </Router>
  );
}

export default App;
