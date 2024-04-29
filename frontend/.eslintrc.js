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
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: [
          '.js',
          //   '.jsx',
          '.ts',
          //   '.tsx',
        ],
      },
    },
  },
}
