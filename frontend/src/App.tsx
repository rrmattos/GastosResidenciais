import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

import Persons from './pages/Persons';
import Categories from './pages/Categories';
import Transactions from './pages/Transactions';
import Reports from './pages/Reports';

export default function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand">Controle de Gastos</span>

          <div className="navbar-nav">
            <NavLink className="nav-link" to="/">Dashboard</NavLink>
            <NavLink className="nav-link" to="/persons">Pessoas</NavLink>
            <NavLink className="nav-link" to="/categories">Categorias</NavLink>
            <NavLink className="nav-link" to="/transactions">Transações</NavLink>
          </div>
        </div>
      </nav>

      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<Reports />} />
          <Route path="/persons" element={<Persons />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/transactions" element={<Transactions />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
