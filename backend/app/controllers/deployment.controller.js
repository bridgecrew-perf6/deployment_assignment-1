const Deployment = require("../models/deployment.model.js");

// Create and Save a new deployment
exports.addDeployment = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a deployment
  const deployment = new Deployment({
    name: req.body.name,
    url: req.body.url,
    versions: req.body.versions,
    deployedAt: new Date()
  });

  Deployment.addDeployment(deployment, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the deployment."
      });
    } else {
      res.send(data);
    }
  });

};

// Retrieve all deployment from the database.
exports.getDeployments = (req, res) => {
  Deployment.getDeployments((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Deployments."
      });
    else res.send(data);
  });
};

// Delete a deployment with the specified deploymentId in the request
exports.deleteDeployment = (req, res) => {
  Deployment.deleteDeployment(req.params.deploymentId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found deployment with id ${req.params.deploymentId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete deployment with id " + req.params.deploymentId
        });
      }
    } else res.send({ message: `Deployment deleted successfully!` });
  });
};
