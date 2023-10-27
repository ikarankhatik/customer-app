import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Fetch,  } from '../helper/dbFetch';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/userSlice';

interface FormValues {
  email: string;
  password: string;
}

const SignIn = () => {
  const initialValues: FormValues = {
    email: '',
    password: '',
  };

  const validationSchema: Yup.ObjectSchema<FormValues> = Yup.object({
    email: Yup.string().required('Email is required').email('Invalid email format'),
    password: Yup.string().required('Password is required'),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values: FormValues, { resetForm }: { resetForm: () => void }) => {
    // Handle sign-in submission here, e.g., send the data to an API
    const path:string = '/api/v1/user/sign-in';
    resetForm();
    const response:any = await Fetch(path, values)

    if(response.success) {
      toast.success(response.message)
      dispatch(login(response.user.id));
      navigate('/customer')
    }else{
      toast.info(response.message);
    }
    
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Sign In</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="space-y-4">
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
            <button type="submit" className="bg-blue text-white p-2 rounded-md w-full">Sign In</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SignIn;
