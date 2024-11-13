module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript files using ts-jest
    },
    transformIgnorePatterns: ['node_modules/(?!(your-esm-module|another-esm-module)/)'],
};  