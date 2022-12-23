import styled from "styled-components"
import React from 'react'

const Container = styled.div`
    height: 30px;
    background-color: #45A0E0 ;
    color: white;  
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight = 500px;
`;

const Announcement = () => {
  return (
    <Container>
        Super Deal! Free Shipping on Orders over $50
    </Container>
  )
}

export default Announcement
