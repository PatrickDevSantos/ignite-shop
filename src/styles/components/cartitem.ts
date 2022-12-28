import { styled } from "..";

export const CartItemContainer = styled('div', {
  display: 'flex',
  gap: '1.25rem',

  '.item-details': {
    display: 'flex',
    flexDirection: 'column',

    h2: {
      fontSize: '1.125rem',
      fontWeight: 400,
      color: '$gray300',
      lineHeight: 1.6,
      marginBottom: 2,
    },

    span: {
      fontSize: '1.125rem',
      fontWeight: 700,
      color: '$gray100',
      marginBottom: '0.5rem',
    },

    button: {
      background: 'transparent',
      border: 'none',
      outline: 'none',
      fontSize: '1rem',
      fontWeight: 700,
      color: '$green500',
      lineHeight: 1.6,
      textAlign: 'left',
      cursor: 'pointer',

      '&:hover': {
        color: '$green300',
      }
    }
  }
})

export const ImageContainer = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  objectFit: 'cover',

  width: '100%',
  maxWidth: 100,
  height: 93,
})