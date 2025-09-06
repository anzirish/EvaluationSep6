import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Signup from './pages/Signup';
import Gallery from './pages/Gallery';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/gallery' element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;