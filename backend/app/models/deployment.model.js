const { MongoClient, ObjectId } = require('mongodb');
const uri = "mongodb+srv://shobhit:qwerty12345@cluster0.czcq7.mongodb.net/deployment?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const collection = client.db("deployment").collection("test");

// constructor
const Deployment = function (deployment) {
  this.name = deployment.name;
  this.url = deployment.url;
  this.versions = deployment.versions;
  this.deployedAt = deployment.deployedAt;
};

Deployment.addDeployment = (newDeployment, result) => {
  client.connect(err => {
    if (err) {
      console.log("client error: ", err);
      result(null, err);
      return;
    }
    collection.insertOne(newDeployment, function (err, res) {
      if (err) {
        console.log("collection error: ", err);
        result(null, err);
        return;
      }
      console.log("Created deployment: ", { response: res, ...newDeployment });
      result(null, res);
      client.close();
    });
  });
};

Deployment.getDeployments = result => {
  client.connect(err => {
    if (err) {
      console.log("client error: ", err);
      result(null, err);
      return;
    }
    collection.find({}).toArray(function (err, res) {
      if (err) {
        console.log("collection error: ", err);
        result(null, err);
        return;
      }
      console.log("Get deployments : ", res);
      result(null, res);
      client.close();
    });
  });
};

Deployment.deleteDeployment = (deploymentId, result) => {
  client.connect(err => {
    if (err) {
      console.log("client error: ", err);
      result(null, err);
      return;
    }
    const deploymentData = { "_id": ObjectId(deploymentId) }
    collection.deleteOne(deploymentData, function (err, res) {
      if (err) {
        console.log("collection error: ", err);
        result(null, err);
        return;
      }
      console.log("Deleted deployment with deployment data: ", deploymentData);
      result(null, res);
      client.close();
    });
  });
};

module.exports = Deployment;
