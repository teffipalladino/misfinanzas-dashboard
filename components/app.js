import { Sidebar } from './components/Sidebar.js';

function renderApp() {
  const root = document.getElementById('root');
  root.innerHTML = '';

  const layout = document.createElement('div');
  layout.className = 'flex';

  const main = document.createElement('main');
  main.className = 'flex-1 p-4';

  const changeView = (viewId) => {
    main.innerHTML = `<h1>${viewId} (en desarrollo)</h1>`;
  };

  layout.appendChild(Sidebar(changeView));
  layout.appendChild(main);
  root.appendChild(layout);
}

renderApp();
