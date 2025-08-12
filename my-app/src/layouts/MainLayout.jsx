import React from 'react';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveItem } from '../store/slice/jobSlice';

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
  const activeItem = useSelector(state => state.job.activeItem);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1 min-h-0">
        <Sidebar 
          activeItem={activeItem} 
          setActiveItem={(id) => dispatch(setActiveItem(id))}
        />
        <main className="flex-1 overflow-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
