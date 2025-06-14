import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/QA/**/*.test.ts'], // дуже важливо: шукає всі тести тільки в QA
  modulePathIgnorePatterns: ['dist', 'node_modules'],
};

export default config;
