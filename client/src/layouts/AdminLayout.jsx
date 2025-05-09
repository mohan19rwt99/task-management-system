// layouts/AdminLayout.js
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from '../sidebar/Sidebar';



function AdminLayout() {
  const user = useSelector((state) => state.Auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className="flex">
      <Sidebar/>
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;