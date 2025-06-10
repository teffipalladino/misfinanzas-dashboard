import { Sidebar } from './components/Sidebar.js';

const root = document.getElementById('root');
const layout = document.createElement('div');
layout.className = 'layout';

const main = document.createElement('main');
main.innerHTML = '<h1>Dashboard (en desarrollo)</h1>';

const changeView = (view) => {
  main.innerHTML = `<h1>${view} (en desarrollo)</h1>`;
};

layout.appendChild(Sidebar(changeView));
layout.appendChild(main);
root.appendChild(layout);
