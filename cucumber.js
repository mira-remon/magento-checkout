module.exports = {
  default: {
    require: ["features/step_definitions/*.js", "features/support/*.js"],
    format: ["html:reports/cucumber-report.html"],
    paths: ["features/*.feature"],
    parallel: 1
  },
};
