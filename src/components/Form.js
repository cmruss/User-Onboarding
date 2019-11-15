import React, {useState, useEffect} from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import {withFormik, Form, Field} from 'formik';

const UserForm = ({values, errors, touched, status}) =>{
    const [users, setUsers] = useState([]);

    useEffect(() => {
        status && setUsers(users => [...users, status]);
    }, [status]);

    return(
        <div className="user-form">
            <Form className="formik-form">
                <h1>get on the bus!</h1>
                <Field className='field' placeholder='name' type='text' name='name'/>
                {touched.name && errors.name && ( <p className='errors'>{errors.name}</p>)}

                <Field className='field' placeholder='email' type='text' name='email'/>
                {touched.email && errors.email && (<p className='errors'>{errors.email}</p>)}

                <Field className='field' placeholder='password' type='text' name='password'/>
                {touched.password && errors.password && (<p className='errors'>{errors.password}</p>)}

                <label>
                <Field type='checkbox' name='terms' checked={values.terms}/>I Agree to Terms of Service</label>
                {touched.terms && errors.terms && (<p className='errors'>{errors.terms}</p>)}

                <button className='button' type='submit'>submit</button>
            </Form>
            {users.map(user => (
                    <div className='user-card'>
                <ul key={user.id}>
                    <li>name: {user.name}</li>
                    <li>email: {user.email}</li>
                    <li>password: {user.password}</li>
                </ul>
                </div>
                ))}  
        </div>
    );
};
const FormikUserForm = withFormik({
    mapPropsToValues({name, email, password, terms}) {
        return {
        name: name || '',
        email: email || '',
        password: password || '',
        terms: terms || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
        terms: Yup.boolean().oneOf([true], 'Must agree to terms of service')
    }),
    handleSubmit(values, {setStatus, resetForm}){
        axios
            .post('https://reqres.in/api/users/', values)
            .then(response => {
                setStatus(response.data);
                console.log(response);
                resetForm({});
            })
            .catch(error => console.log('No dice.', error.response));
    }

})(UserForm);

export default FormikUserForm;