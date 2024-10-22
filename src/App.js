import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AirportPage from './pages/AirportPage';
import PlanePage from './pages/PlanePage';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><a href="/airports">Aeropuertos</a></li>
          <li><a href="/planes">Aviones</a></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/airports" element={<AirportPage />} />
        <Route path="/planes" element={<PlanePage />} />
      </Routes>
    </Router>
  );
}

export default App;
