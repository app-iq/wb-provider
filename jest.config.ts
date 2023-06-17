export default {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    coveragePathIgnorePatterns: ['Examples'],
};
