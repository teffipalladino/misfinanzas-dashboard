import { Link } from 'react-router-dom';
import { Home, DollarSign, BarChart2, PieChart } from 'lucide-react';

export function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white fixed">
      <div className="p-4 text-2xl font-bold border-b border-gray-700">
        Mis Finanzas
      </div>
      <nav className="mt-4 flex flex-col space-y-2 px-4">
        <Link to="/" className="flex items-center space-x-2 hover:text-blue-400">
          <Home size={20} />
          <span>Inicio</span>
        </Link>
        <Link to="/precio-venta" className="flex items-center space-x-2 hover:text-blue-400">
          <DollarSign size={20} />
          <span>Precio de Venta</span>
        </Link>
        <Link to="/punto-equilibrio" className="flex items-center space-x-2 hover:text-blue-400">
          <PieChart size={20} />
          <span>Punto de Equilibrio</span>
        </Link>
        <Link to="/dashboard" className="flex items-center space-x-2 hover:text-blue-400">
          <BarChart2 size={20} />
          <span>Dashboard</span>
        </Link>
      </nav>
    </div>
  );
}
