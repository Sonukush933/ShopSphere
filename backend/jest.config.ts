import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",

  roots: ["<rootDir>/tests"],

  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],

  testMatch: ["**/*.test.ts"],

  moduleFileExtensions: ["ts", "js", "json"],

  clearMocks: true,

  verbose: true,
  
  testTimeout: 30000,
};

export default config;