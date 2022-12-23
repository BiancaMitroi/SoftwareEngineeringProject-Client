import React, {useEffect, useState} from 'react'
import styled from "styled-components"
import Product from './Product'
import Cookies from "js-cookie";

const Container = styled.div`
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
`
const Products = () => {
    const [popularProducts, setPopularProducts] = useState();

    const getProducts = async () => {
        const response = await fetch(
            "http://localhost:8080/product/all", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Cookies.get("auth_token")
                }
            }
        ).then((response) => response.json());

        setPopularProducts(response);
    };
    useEffect(() => {
        getProducts()
    }, []);
    return (<Container>
            {
                popularProducts && popularProducts.map(item =>
                    <Product item={item} key={item.id}/>
                )
            }
        </Container>
    )
}

export default Products
