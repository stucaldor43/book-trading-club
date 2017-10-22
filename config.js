module.exports = {
    protocol: "http",
    domain: "localhost",
    port: 8080
};
let config = {};
switch(process.env.NODE_ENV) {
    case "dev": 
        config = {
            protocol: "http",
            domain: "localhost",
            port: 8080
        }
        break;
    case "production": 
        break;
    default:
        throw new Error("Illegal environment value");
}

module.exports = config;