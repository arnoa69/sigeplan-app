import styled, { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    primary: '#0056b3',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    light: '#f8f9fa',
    dark: '#343a40',
    white: '#ffffff',
    border: '#dee2e6',
    background: '#f4f7f6',
    sidebar: '#1a1d21',
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 15px rgba(0,0,0,0.1)',
  },
  radius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '20px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  }
};

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
    background-color: ${theme.colors.background};
    color: ${theme.colors.dark};
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    transition: all 0.2s ease;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;
