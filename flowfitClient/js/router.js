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

async function loadController(controllerName) {
    try {
        const module = await import(`./controller/${controllerName}.js`);
        if (module && module.init) {
            module.init(); // Chamar a função init do controlador
        } else {
            console.error(`Controller ${controllerName} não possui uma função init.`);
        }
    } catch (err) {
        console.error(`Failed to load controller: ${controllerName}`, err);
    }
}

function setCurrentRoute(route) {
    routes.currentPath = route;
}

function navigate(path, firstLoad = false) {
    const routeKey = Object.keys(routes).find(key => routes[key].path === path);
    const route = routes[routeKey] || routes.home;

    setCurrentRoute(route);

    firstLoad
        ? history.replaceState(route, '', route.path)
        : history.pushState(route, '', route.path);

    loadController(route.controller);
}

function init() {
    console.log("Router inicializado");

    const path = window.location.pathname;
    navigate(path, true);

    window.addEventListener('popstate', handlePopState);
    addEventsToAnchors();
}

export default { init, navigate };
