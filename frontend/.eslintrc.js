module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'react-hooks', // eslint-plugin-react-hooks 설치한 경우
  ],
  extends: [
    'plugin:react/recommended', // eslint-plugin-react 설치한 경우
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'prettier/prettier': 0,
    '@typescript-eslint/no-explicit-any': 'off',
  },

  settings: {
    'import/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },
    'import/resolver': {
      node: {
        paths: ['./'],
        extensions: ['.js', '.jsx', '.ts', '.d.ts', '.tsx'],
      },
      typescript: { alwaysTryTypes: true },
    },
  },
};
