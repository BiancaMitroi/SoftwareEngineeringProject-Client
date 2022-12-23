import React from 'react'
import styled from 'styled-components'
import {Formik} from 'formik';
import {useNavigate} from 'react-router-dom'
import Cookies from "js-cookie";

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


const FinishOrder = () => {
    const navigate = useNavigate();
    return (
        <Container>
            <Wrapper>
                <Title>
                    <center> FINISH ORDER</center>
                </Title>
                <Form>
                    <Form>
                        <div>
                            <Formik
                                initialValues={{name: '', surname: '', street: '', postalcode: ''}}
                                validate={values => {
                                    const errors = {};
                                    if (!values.name) {
                                        errors.name = 'Required';
                                    } else if (
                                        !/^[a-zA-Z ]{2,30}$/i.test(values.name)
                                    ) {
                                        errors.name = 'Invalid name';
                                    }
                                    if (!values.surname) {
                                        errors.surname = 'Required';
                                    } else if (
                                        !/^[a-zA-Z ]{2,30}$/i.test(values.surname)
                                    ) {
                                        errors.surname = 'Invalid surname';
                                    }
                                    if (!values.street) {
                                        errors.street = 'Required';
                                    } else if (
                                        !/[A-Za-z0-9'.\-\s,]/i.test(values.street)
                                    ) {
                                        errors.street = 'Invalid street name';
                                    }
                                    if (!values.postalcode) {
                                        errors.postalcode = 'Required';
                                    } else if (
                                        !/[\d{6}]/i.test(values.postalcode)
                                    ) {
                                        errors.postalcode = 'Invalid postal code';
                                    }
                                    return errors;
                                }}
                                onSubmit={(values, {setSubmitting}) => {
                                    fetch("http://localhost:8080/order/save", {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': 'Bearer ' + Cookies.get("auth_token")
                                        },
                                        body: JSON.stringify({
                                            "username": Cookies.get("auth_user"),
                                            "name": values.name,
                                            "surname": values.surname,
                                            "address": values.street,
                                            "postalCode": values.postalcode
                                        })
                                    }).then((data) => {
                                        if (data.status === 200) {
                                            console.log(data.text())
                                            alert("Successful order!")
                                            navigate("/")
                                        } else {
                                            alert("Error finishing order!")
                                        }
                                    }).catch(() => alert("Error finishing order!"))
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
                                        <center>
                                            <table>
                                                <tr>
                                                    <td>Name:</td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.name}
                                                        />
                                                        {errors.name && touched.name && errors.name}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Surname:</td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            name="surname"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.surname}
                                                        />
                                                        {errors.surname && touched.surname && errors.surname}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Street:</td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            name="street"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.street}
                                                        />
                                                        {errors.street && touched.street && errors.street}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Postal code:</td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            name="postalcode"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.postalcode}
                                                        />
                                                        {errors.postalcode && touched.postalcode && errors.postalcode}
                                                    </td>
                                                </tr>
                                            </table>
                                            <button type="submit" disabled={isSubmitting}>
                                                Submit
                                            </button>
                                        </center>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </Form>
                </Form>

            </Wrapper>
        </Container>
    )
}

export default FinishOrder