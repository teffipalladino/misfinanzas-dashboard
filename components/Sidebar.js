import { CalculadoraPrecio } from './CalculadoraPrecio.js';
export function Sidebar(onSelectView) {
  const sidebar = document.createElement('nav');
  sidebar.className = 'w-64 h-screen bg-[#1f2937] text-white p-4 flex flex-col gap-4 shadow-lg';

  const title = document.createElement('h2');
  title.textContent = 'Mis Finanzas';
  title.className = 'text-2xl font-bold mb-6 text-center text-[#8b5cf6]';
  sidebar.appendChild(title);

  const navItems = [
    { name: 'Dashboard', id: 'dashboard', icon: '📊' },
    { name: 'Precio de venta', id: 'precio', icon: '💸' },
    { name: 'Punto de equilibrio', id: 'equilibrio', icon: '⚖️' },
    { name: 'Cuotas vs. Contado', id: 'cuotas', icon: '💳' },
  ];

  navItems.forEach(item => {
    const button = document.createElement('button');
    button.textContent = `${item.icon} ${item.name}`;
    button.className = 'text-left py-2 px-4 hover:bg-[#2563eb] rounded transition';
    button.onclick = () => onSelectView(item.id);
    sidebar.appendChild(button);
  });

  return sidebar;
}
