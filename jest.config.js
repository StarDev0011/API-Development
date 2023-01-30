/** @type {import('ts-jest').JestConfigWithTsJest} */

process.env.LOG_LEVEL = "debug";
process.env.DEPLOYMENT = "DEVELOPMENT";

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node'
};
