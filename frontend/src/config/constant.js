const CONSTANT = {

    // Server Urls
    API_DOMAIN: 'http://127.0.0.1:3002/',
    FRONT_END_DOMAIN: 'http://localhost:3000/',

    // API End points
    
    ADD_DEPLOYMENTS: 'addDeployment',
    GET_DEPLOYMENTS: 'getDeployments',
    DELETE_DEPLOYMENT: 'deleteDeployment/',

    // Redirect Urls
    DEPLOYMENT_LIST: 'deploymentlist',

    // Other Contants
    COMMON_API_HEADERS: {
        'Content-Type': 'application/json;charset=utf-8',
        "Access-Control-Allow-Origin": "*"
    },
    TOKEN: "token",
    TOKEN_CODE: "admin12345"

}

module.exports = CONSTANT
