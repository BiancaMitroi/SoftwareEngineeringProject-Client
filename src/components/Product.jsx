import {ShoppingCartOutlined, SearchOutlined, FavoriteBorderOutlined} from '@material-ui/icons'
import React from 'react'
import styled from "styled-components"
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";


const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
`

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #EDF2F5;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;
const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;

`
const Image = styled.img`
  height: 75%;
  z-index: 2;
`

const Icon = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;

  transition: all 0.5s ease;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`

const Product = ({item}) => {
    const navigate = useNavigate();

    function addToCart(item) {
        fetch("http://localhost:8080/cart/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get("auth_token")
            },
            body: JSON.stringify({"username": Cookies.get("auth_user"), "productId": item.id})
        }).then((data) => {
            if (data.status === 200) {
                navigate("/cart")
            } else if(data.status === 403) {
                alert("Please login!")
            }
            else {
                alert("Error adding product!")
            }
        }).catch(() => alert("Error adding product!"))
    }

    return (
        <Wrapper>
            <Container>

                <Circle/>
                <Image src={item.image}/>

                <Info>
                    <Icon onClick={() => addToCart(item)}>
                        <ShoppingCartOutlined/>
                    </Icon>
                    <Icon>
                        <SearchOutlined/>
                    </Icon>
                    <Icon>
                        <FavoriteBorderOutlined/>
                    </Icon>
                </Info>
            </Container>

        </Wrapper>
    )
}

export default Product
