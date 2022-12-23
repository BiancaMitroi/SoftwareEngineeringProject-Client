import {Search} from '@material-ui/icons';
import React from 'react'
import styled from 'styled-components'
import {Badge} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {Link, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

const Container = styled.div`
  height: 60px;

`

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div`
  flex: 0.8;
`;

const SearchContainer = styled.div`
  border: 0.0px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 15px;
  padding: 5px
`;

const Input = styled.input`
  // border:none;
`
const Logo = styled.h1`
  font-weight: bold;
`;
const Center = styled.div`
  flex: 2;
`;

const Right = styled.div`
  flex: 0.7;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`

const ProfileIcon = styled.div`
  display: inline-block;
  background-color: #512DA8;
  width: 25px;
  height: 25px;
  margin-left: 25px;
  border-radius: 50%;
  font-size: 10px;
  color: #fff;
  text-align: center;
`

const ProfileIconText = styled.p`
  color: white;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  text-decoration: none;
  padding-top: 5px;
  padding-left: 10px;
`


const Navbar = () => {
    const navigate = useNavigate()
    function logout() {
        Cookies.remove("auth_user")
        Cookies.remove("auth_token")
        navigate("/")
    }
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Logo>
                        FEDORA MAKE-UP.
                    </Logo>
                </Left>

                <Center>
                    <SearchContainer>
                        <Input/>
                        <Search/>
                    </SearchContainer>
                </Center>

                <Right>
                    <MenuItem><Link to="/register"> REGISTER </Link></MenuItem>
                    <MenuItem><Link to="/login"> LOGIN </Link></MenuItem>

                    { Cookies.get('auth_user') &&
                    <MenuItem>
                        <Link to="/cart">
                            <Badge badgeContent={0} color="primary">

                                <ShoppingCartIcon/>
                            </Badge>
                        </Link>

                    </MenuItem>
                    }
                </Right>
                { Cookies.get('auth_user') &&
                    <ProfileIcon>
                        <ProfileIconText>{
                            Cookies.get('auth_user')[0].toUpperCase()
                        }</ProfileIconText>
                    </ProfileIcon>
                }
                { Cookies.get('auth_user') &&
                    <MenuItem onClick={logout}>
                        LOGOUT
                    </MenuItem>
                }
            </Wrapper>

        </Container>
    )
}

export default Navbar
