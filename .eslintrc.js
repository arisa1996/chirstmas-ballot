module.exports = {
    root: true,
    env: {
        node: true
    },
    parser: 'vue-eslint-parser',
    extends: [
        'plugin:vue/essential',
        'plugin:@typescript-eslint/recommended',
        'eslint:recommended',
        '@vue/standard',
        '@vue/typescript/recommended'
    ],
    plugins: ['@typescript-eslint'],
    parserOptions: {
        ecmaVersion: 2020
    },
    ignorePatterns: ['src/gql.d.ts'],
    rules: {
        quotes: ['error', 'single'],
        indent: ['error', 4],
        camelcase: 'off',
        'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        'vue/html-indent': ['error', 4],
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'prefer-const': 'off',
        'space-before-function-paren': 'off',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'vue/multi-word-component-names': 'off',
        '@typescript-eslint/ban-ts-comment': 'off'
    }
}
