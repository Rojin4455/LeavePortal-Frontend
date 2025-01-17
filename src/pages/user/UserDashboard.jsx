import React, { useState } from 'react';
import {
  History,
  Plus,
  CheckSquare,
  Settings,

} from 'lucide-react';
import Header from '../../components/user/Header';
import Sidebar from '../../components/user/Sidebar';
import Content from '../../components/user/Content';



const UserDashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

const navItems = [
    { id: 'current-status', label: 'Current Status', icon: CheckSquare },
    { id: 'add-leave', label: 'Request Leave', icon: Plus },
    // { id: 'history', label: 'Leave History', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];


  return (
    <div className="min-h-screen bg-gray-50">
      <Header setIsMobileMenuOpen={setIsMobileMenuOpen} isMobileMenuOpen={isMobileMenuOpen} />
      <Sidebar isMobileMenuOpen={isMobileMenuOpen} navItems={navItems}/>
      <Content navItems={navItems} />
    </div>
  );
};

export default UserDashboard; 