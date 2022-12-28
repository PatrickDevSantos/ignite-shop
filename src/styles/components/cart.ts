import { styled } from "..";

export const CartContainer = styled('aside', {
  display: 'flex',
  flexDirection: 'column',
  background: '$gray800',
  padding: '4.5rem 3rem 3rem',
  position: 'absolute',
  right: -480,
  top: 0,
  minHeight: '100vh',
  width: 480,
  transition: 'right 0.5s',

  '&.active': {
    right: 0,
  },

  h1: {
    fontSize: '$lg',
    color: '$gray100',
    fontWeight: 700,
    marginBottom: '2rem',
  },

  '.list': {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },

  footer: {
    marginTop: 'auto',


    '.cart-details': {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '3.5rem',
      gap: '0.25rem',

      '.item': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '$md',
        color: '$gray100',

        'span.price': {
          fontSize: '$xl',
          color: '$gray100',
          fontWeight: 700,
        },
      },
    }
  }


})



export const CloseButon = styled('button', {
  background: 'transparent',
  border: 'none',
  outline: 'none',
  position: 'absolute',
  color: '$gray300',
  top: '1.5rem',
  right: '1.5rem',
  cursor: 'pointer',

  '&:hover': {
    color: '$gray400',
  }
})

export const FinishBuyButton = styled('button', {
  fontSize: '$md',
  fontWeight: 700,
  color: '$white',
  padding: '1.25rem',
  width: '100%',
  background: '$green500',
  border: 'none',
  borderRadius: 6,
  outline: 'none',
  cursor: 'pointer',

  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },

  '&:not(:disabled):hover': {
    backgroundColor: '$green300',
  }
})

export const ClearBagButton = styled('button', {
  fontSize: '$md',
  fontWeight: 700,
  color: '$white',
  padding: '1.25rem',
  width: '100%',
  background: '$gray300',
  border: 'none',
  borderRadius: 6,
  outline: 'none',
  cursor: 'pointer',
  marginTop: '1rem',

  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },

  '&:not(:disabled):hover': {
    backgroundColor: '$gray900',
  }
})