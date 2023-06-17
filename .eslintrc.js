module.exports = {
    extends: ['wbox-frontend'],
    overrides: [
        {
            files: ['jest.config.ts'],
            rules: {
                'import/no-default-export': 'off',
            },
        },
    ],
};
