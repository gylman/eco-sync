// migrations/2_deploy_contracts.js
const CompanyRegistry = artifacts.require("CompanyRegistry");

module.exports = function (deployer) {
  deployer.deploy(CompanyRegistry);
};
