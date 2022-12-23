import React from 'react'
import styled from 'styled-components'
import {Formik} from 'formik';
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import jwtDecode from "jwt-decode";

const Container = styled.div`
  width: 100 w;
  height: 100vh;
  background-color: pink;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Wrapper = styled.div`
  padding: 25px;
  width: 40%;
  background-color: white;

`

const Form = styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursive: pointer;
`


const Login = () => {
    const navigate = useNavigate();
    return (
        <Container>
            <Wrapper>
                <Title> SIGN IN </Title>
                <Form>
                    <Form>
                        <div>
                            <Formik
                                initialValues={{email: '', password: ''}}
                                validate={values => {
                                    const errors = {};
                                    if (!values.email) {
                                        errors.email = 'Required';
                                    } else if (
                                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                    ) {
                                        errors.email = 'Invalid email address';
                                    }
                                    return errors;
                                }}
                                onSubmit={(values, {setSubmitting}) => {
                                    fetch("http://localhost:8080/auth/login", {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({"username": values.email, "password": values.password})
                                    }).then((data) => {
                                        if (data.status === 200) {
                                            data.text().then((result) => {
                                                alert("Login successful!")
                                                Cookies.set('auth_token', result, {
                                                    sameSite: 'strict',
                                                    secure: true
                                                })
                                                Cookies.set('auth_user', jwtDecode(result).sub, {
                                                    sameSite: 'strict',
                                                    secure: true
                                                })
                                                navigate("/")
                                            })
                                        } else {
                                            alert("Error logging in!")
                                        }
                                    }).catch(() => alert("Error logging in!"))
                                        .finally(() => setSubmitting(false));
                                }}
                            >
                                {({
                                      values,
                                      errors,
                                      touched,
                                      handleChange,
                                      handleBlur,
                                      handleSubmit,
                                      isSubmitting,
                                      /* and other goodies */
                                  }) => (
                                    <form onSubmit={handleSubmit}>
                                        <input
                                            type="email"
                                            name="email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                        />
                                        {errors.email && touched.email && errors.email}
                                        <input
                                            type="password"
                                            name="password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                        />
                                        {errors.password && touched.password && errors.password}
                                        <button type="submit" disabled={isSubmitting}>
                                            Submit
                                        </button>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </Form>
                    <Link>DO NOT REMEMBER THE PASSWORD?</Link>
                    <Link>CREATE A NEW ACCOUNT</Link>
                </Form>

            </Wrapper>
        </Container>
    )
}

export default Login
