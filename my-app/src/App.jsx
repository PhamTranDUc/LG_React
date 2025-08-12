import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DashboardPage from './pages/DashboardPage';
import AddJobPage from './pages/AddJobPage';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/add-job" element={<AddJobPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;