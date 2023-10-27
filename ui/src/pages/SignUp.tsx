import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Fetch } from '../helper/dbFetch';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router';

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const initialValues: FormValues = {
    name: '',
    email: '',
    password: '',
  };

  const validationSchema: Yup.ObjectSchema<FormValues> = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Invalid email format'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  });

  const navigate = useNavigate();

  const onSubmit = async (values: FormValues, { resetForm }: { resetForm: () => void }) => {
    // Handle form submission here, e.g., send the data to an API
    console.log('Form submitted with values:', values);
    resetForm();
    const path:string = '/api/v1/user/sign-up';
    const response:any = await Fetch(path, values) 
    console.log(response);    
    if(response.success){
      toast.success(response.message);
      navigate('/')
    }else{
      toast.info(response.message)
    }
  };

  
     
 

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded shadow-xl">
      <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-600">Name</label>
            <Field
              type="text"
              id="name"
              name="name"
              className="w-full p-2 border rounded-md"
            />
            <ErrorMessage name="name" component="div" className="text-red text-sm" />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-600">Email</label>
            <Field
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border rounded-md"
            />
            <ErrorMessage name="email" component="div" className="text-red text-sm" />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-600">Password</label>
            <Field
              type="password"
              id="password"
              name="password"
              className="w-full p-2 border rounded-md"
            />
            <ErrorMessage name="password" component="div" className="text-red text-sm" />
          </div>
          <div className="text-center">
            <button type="submit" className="bg-blue text-white p-2 rounded-md w-full">Sign Up</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SignUp;
