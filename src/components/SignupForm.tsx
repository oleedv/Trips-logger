import React from 'react';
import {Field, Form, Formik, FormikHelpers, useFormik} from "formik";
import {object, string} from "yup";

// Taken from Formik's examples
// https://github.com/formium/formik/blob/master/examples/async-submission/index.js

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const validationSchema = object().shape({
    firstName: string()
        .required('First name is required'),
    lastName: string()
        .required('Last name is required'),
    email: string()
        .email('Invalid email')
        .required('Field is required'),
    username: string()
        .min(4, 'Must be at least 4 characters')
        .required('Field is required'),
    password: string()
        .required('Password is required'),
});
const SignupForm = () => (
    <div>
        <h1>Sign Up</h1>
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            }}
            onSubmit={async (values) => {
                await sleep(500);
                alert(JSON.stringify(values, null, 2));
            }}
            validationSchema={validationSchema}
        >
            {({ isSubmitting }) => (
                <Form>
                    <label htmlFor="firstName">First Name</label>
                    <Field name="firstName" placeholder="Jane" />

                    <label htmlFor="lastName">Last Name</label>
                    <Field name="lastName" placeholder="Doe" />

                    <label htmlFor="email">Email</label>
                    <Field name="email" placeholder="jane@acme.com" type="email"/>

                    <label htmlFor="password">Password</label>
                    <Field name="password" placeholder="password" type="password"/>

                    <label htmlFor="password">Confirm Password</label>
                    <Field name="confirmPassword" placeholder="password" type="password" />

                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    </div>
);
export default SignupForm;