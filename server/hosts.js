const routes = {
    gtv: {
        protocol: 'https',
        host: 'gtv-backend.herokuapp.com',
    },
};

const getRoute = hostName => {
    const route = routes[hostName];

    return `${route.protocol}://${route.host}`
};

module.exports = getRoute;
