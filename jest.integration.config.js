export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['./src'],
    silent: false,
    verbose: true,
    collectCoverageFrom: ['src/**'],
    coverageReporters: ['text'],
    testMatch: ["**/*.integration-spec.ts"],
};