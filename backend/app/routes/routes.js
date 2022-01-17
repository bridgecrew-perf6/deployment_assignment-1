module.exports = app => {
  const deployment = require("../controllers/deployment.controller.js");

  // Create a new deployment
  app.post("/addDeployment", deployment.addDeployment);

  // Retrieve all deployment
  app.get("/getDeployments", deployment.getDeployments);

  // Delete a deployment with deploymentId
  app.delete("/deleteDeployment/:deploymentId", deployment.deleteDeployment);

};
