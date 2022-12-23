import React from 'react'
import styled from 'styled-components'
import {Formik} from 'formik';
import {useNavigate} from "react-router-dom";

const Container = styled.div`
  width: 100 w;
  height: 100vh;
  background-color: pink;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Wrapper = styled.div`
  padding: 20px;
  width: 40%;
  background-color: white;

`

const Form = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 10px;

`

const Register = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <Wrapper>
                <Title> CREATE AN ACCOUNT</Title>
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
                                fetch("http://localhost:8080/auth/register", {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({"username": values.email, "password": values.password})
                                }).then((data) => navigate("/"))
                                    .catch(() => alert("Error registering user!"))
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
                <Agreement>
                    By creating an account, I consent to the processing of
                    my personal data in accordance with the <b> PRIVACY POLICY</b>

                </Agreement>
            </Wrapper>
        </Container>
    )
}

export default Register
