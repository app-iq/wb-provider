export default {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    coveragePathIgnorePatterns: ['Examples'],
    testMatch: ['**/src/**/*.test.ts?(x)'],
};
