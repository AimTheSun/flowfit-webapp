import { routes } from './routes.js';

function handlePopState({ state }) {
    const route = state || routes.home;

    setCurrentRoute(route);
    loadController(route.controller);
}

function addEventsToAnchors() {

    document.body.addEventListener("click", function (event) {

        const anchor = event.target.closest('a'); // Find the closest <a> element

        // Check if the click target is an <a> element
        if (anchor) {
            event.preventDefault(); // Prevent the default link behavior
            navigate(anchor.pathname); // Call the navigate function with the path
        }

    })

}

function setCurrentRoute(route) {
    routes.currentPath.path = route.path;
    routes.currentPath.controller = route.controller;
}

function navigate(path, firstLoad = false) {
    // Verifica se a rota é "/admins/:id/verify"
    const matchVerify = path.match(/\/admins\/(\d+)\/verify/);
    const routeKey = matchVerify
        ? 'list' // Define o controlador "listController" para esta rota
        : Object.keys(routes).find(key => routes[key].path === path);

    const route = routes[routeKey] || routes.home;

    if (routes.currentPath.path === route.path) {
        return; // Evita recarregar a mesma rota
    }

    setCurrentRoute(route);

    firstLoad
        ? history.replaceState(route, '', route.path)
        : history.pushState(route, '', route.path);

    if (matchVerify) {
        loadController(route.controller, { clientId: matchVerify[1] }); // Passa o ID do cliente para o controlador
    } else {
        loadController(route.controller);
    }
}

async function loadController(controllerName, params = {}) {
    try {
        const module = await import(`./controller/${controllerName}.js`);
        if (module && module.init) {
            module.init(params); // Passa os parâmetros para o controlador
        } else {
            console.error(`Controller "${controllerName}" não exporta uma função init.`);
        }
    } catch (err) {
        console.error(`Falha ao carregar o controlador: ${controllerName}`, err);
    }
}


function init() {
    console.log("Router Initialized");

    const path = window.location.pathname;
    navigate(path, true);

    window.addEventListener('popstate', handlePopState);
    addEventsToAnchors();
}

export default { init, navigate };
