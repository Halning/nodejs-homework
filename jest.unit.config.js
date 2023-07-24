export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['./src'],
    silent: false,
    verbose: true,
    collectCoverageFrom: [
        '**/src/**/*.ts',
        '!**/dist/**/*.ts',
        '!**/event-emiters/**/*.ts',
        '!**/src/**/*.integration-spec.ts',
        '!**/src/**/*.regression-spec.ts',
    ],
    coverageReporters: ['text'],
    testMatch: ["**/*.spec.ts"],

};