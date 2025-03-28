/* eslint-disable max-len */
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      'semi': ['error', 'always'], // Exige ponto e vírgula no final das linhas
      'comma-dangle': ['error', 'always-multiline'], // Exige vírgula no final de objetos e arrays multilinhas
      'indent': ['error', 2], // Define indentação de 2 espaços
      'space-before-function-paren': ['error', 'always'], // Espaço antes do parênteses em funções
      'no-multiple-empty-lines': ['error', { 'max': 1 }], // Evita múltiplas linhas vazias
      'max-len': ['error', { 'code': 80, 'ignoreUrls': true, 'ignorePattern': '^import\\s.+\\sfrom\\s.+;$|<\\s*(link|meta|title)\\b[^>]*>' }], // Ignora imports e tags HTML de header
      'quotes': ['error', 'single'], // Usa sempre aspas simples
    },
  },
];

export default eslintConfig;
