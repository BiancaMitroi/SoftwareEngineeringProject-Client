import Announcement from '../components/Announcement'
import React, {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import styled from 'styled-components';
import {Link, useNavigate} from 'react-router-dom';
import {Button, Divider} from '@material-ui/core';
import {Add, Remove} from '@material-ui/icons';
import Cookies from "js-cookie";

const Wrapper = styled.div`
  padding: 20px;

`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Info = styled.div`
  flex: 3;
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
const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  //justify-content: space-between;
`;

const ProductName = styled.span``;

const ProductDescr = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${props => props.type === "total" && "500"};
  font-size: ${props => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span`
`;
const SummaryItemPrice = styled.span`
`;


const CartPage = () => {
    const [cartProducts, setCartProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState();
    const navigate = useNavigate();

    const getCartProducts = async () => {
        const response = await fetch(
            "http://localhost:8080/cart/" + Cookies.get("auth_user"), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Cookies.get("auth_token")
                }
            }
        ).then((response) => response.json());

        let sumPrice = 0
        response.map(product => sumPrice += product.price * product.quantity)
        setCartProducts(response);
        setTotalPrice(sumPrice)
    };
    useEffect(() => {
        getCartProducts()
    }, []);

    function addCartProducts(productId, index) {
        fetch("http://localhost:8080/cart/add", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Cookies.get("auth_token")
                },
                body: JSON.stringify({'username': Cookies.get("auth_user"), 'productId': productId})
            }
        ).then((response) => response.json());
        getCartProducts()
        navigate("/cart")
    }

    function removeCartProducts(productId, index) {
        fetch("http://localhost:8080/cart/remove", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Cookies.get("auth_token")
                },
                body: JSON.stringify({'username': Cookies.get("auth_user"), 'productId': productId})
            }
        ).then((response) => response.json());
        getCartProducts()
        navigate("/cart")
    }

    return (
        <div>
            <Announcement/>
            <Navbar/>

            <Wrapper>
                <Title>YOUR BAG</Title>
                <Top>
                    <TopButton>
                        <Link to="/allproductspage"> CONTINUE SHOPPING </Link>
                    </TopButton>
                </Top>


                <Bottom>
                    <Info>
                        {
                            cartProducts !== undefined && cartProducts?.map((item, index) =>
                                <Wrapper>
                                    <Product>
                                        <ProductDetail>
                                            <Image src={item.image}/>

                                            <Details>
                                                <ProductName>
                                                    <b>Product: </b> {item.name}
                                                </ProductName>
                                                <ProductDescr>
                                                    <b>Description: </b>
                                                    {item.description}
                                                </ProductDescr>
                                            </Details>
                                        </ProductDetail>

                                        <PriceDetail>
                                            <ProductAmountContainer>
                                                <Icon onClick={() => addCartProducts(item.id, index)}>
                                                    <Add/>
                                                </Icon>
                                                <ProductAmount> {item.quantity} </ProductAmount>
                                                <Icon onClick={() => removeCartProducts(item.id, index)}>
                                                    <Remove/>
                                                </Icon>
                                            </ProductAmountContainer>

                                            <ProductPrice>${item.price}</ProductPrice>
                                        </PriceDetail>

                                    </Product>

                                    <Divider/>
                                </Wrapper>
                            )
                        }

                    </Info>
                    <Summary>
                        <SummaryTitle>
                            ORDER SUMMARY
                        </SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal:</SummaryItemText>
                            <SummaryItemPrice>${totalPrice}</SummaryItemPrice>
                        </SummaryItem>

                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping: </SummaryItemText>
                            <SummaryItemPrice>$5</SummaryItemPrice>
                        </SummaryItem>

                        <SummaryItem type="total">
                            <SummaryItemText> Total </SummaryItemText>
                            <SummaryItemPrice>${totalPrice + 5}</SummaryItemPrice>

                        </SummaryItem>

                        <Button> <Link to="/placeorder"> PLACE ORDER </Link> </Button>
                    </Summary>
                </Bottom>
            </Wrapper>
        </div>
    )
}

export default CartPage
