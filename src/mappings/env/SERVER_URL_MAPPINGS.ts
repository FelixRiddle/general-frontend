const GOOD_ROOTS = process.env.GOOD_ROOTS_URL ? process.env.GOOD_ROOTS_URL : "http://localhost:3000";
const AUTHENTICATION = process.env.AUTHENTICATION_URL ? process.env.AUTHENTICATION_URL : "http://localhost:38001";
const BACKDOOR_SERVER_ACCESS_URL = process.env.BACKDOOR_SERVER_ACCESS_URL;
const REAL_ESTATE_URL = process.env.REAL_ESTATE_URL;

const SERVER_URL_MAPPINGS = {
    // Frontends
    GOOD_ROOTS,
    GENERAL_FRONTEND: "http://localhost:3003",
    
    // Backends
    AUTHENTICATION,
    BACKDOOR_SERVER_ACCESS: BACKDOOR_SERVER_ACCESS_URL ? BACKDOOR_SERVER_ACCESS_URL : "http://localhost:38002",
    REAL_ESTATE: REAL_ESTATE_URL ? REAL_ESTATE_URL : "http://localhost:38003"
};

export default SERVER_URL_MAPPINGS;
