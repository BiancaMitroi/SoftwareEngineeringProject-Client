//import { Container } from "@material-ui/core";
import styled from 'styled-components'
import React from "react";
import {useNavigate } from 'react-router-dom'
import Products from '../components/Products';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';



const Container = styled.div`
  padding: 15px;
  background-color:  #EDF2F5;
  width: 160px;
  height: 10px;
  display: flex;
  align-items: center;
  margin-left: 20px;
`

const AllProductsPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      
      <Announcement/>
      <Navbar/>
      <Container>
      <Button><Link to="/">
        Back to main page
        </Link>
      </Button>
      </Container>
      
      <Products/>
    </div>
  )
}

export default AllProductsPage
