module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: ['prettier'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: ['react', 'prettier'],
    rules: {
        'prettier/prettier': ['error'],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'], // single quotes only
        // Indentations
        indent: ['error', 4, { SwitchCase: 1 }], // indent with 2 spaces, force switch statements to indent
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        // JSX Specific
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }], // Allowing JSX inside .js files
        'jsx-a11y/mouse-events-have-key-events': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/prop-types': [1, { skipUndeclared: true }],
    },
};
