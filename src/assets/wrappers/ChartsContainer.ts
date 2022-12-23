import styled from 'styled-components'

const Wrapper = styled.section`
  margin-top: 4rem;
  text-align: center;
  button {
    border-color: transparent;
    text-transform: capitalize;
    color: var(--white);
    background: var(--primary-500);
    font-size: 1.25rem;
    cursor: pointer;
    border-radius: var(--borderRadius);
    letter-spacing: var(--letterSpacing);
    padding: 0.375rem 0.75rem;
    box-shadow: var(--shadow-2);
    transition: var(--transition);
    display: inline-block;
    margin-right: 1rem;
  }
  button:hover {
    background: var(--primary-700);
    box-shadow: var(--shadow-3);
  }
  h4 {
    text-align: center;
    margin-bottom: 0.75rem;
  }
`

export default Wrapper
