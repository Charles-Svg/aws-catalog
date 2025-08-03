extend: {
  keyframes: {
    'page-left': {
      '0%': { transform: 'rotateY(0deg)', opacity: '1' },
      '100%': { transform: 'rotateY(-90deg)', opacity: '0.2' },
    },
    'page-right': {
      '0%': { transform: 'rotateY(0deg)', opacity: '1' },
      '100%': { transform: 'rotateY(90deg)', opacity: '0.2' },
    },
  },
  animation: {
    'page-left': 'page-left 0.4s ease forwards',
    'page-right': 'page-right 0.4s ease forwards',
  },
}