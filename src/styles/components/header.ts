import { styled } from "..";

export const HeaderContainer = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',

  button: {
    padding: '0.75rem',
    background: '$gray800',
    color: '$gray300',
    border: 'none',
    borderRadius: 6,
    outline: 'none',
    cursor: 'pointer',
    position: 'relative',

    div: {
      fontSize: '0.875rem',
      background: '$green500',
      color: '$white',
      width: '1.5rem',
      minHeight: '1.5rem',
      borderRadius: '50%',
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      top: -10,
      right: -10,
      border: '3px solid $gray900',
      boxSizing: 'content-box'
    }
  }
})