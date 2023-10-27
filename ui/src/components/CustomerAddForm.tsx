import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addCustomer } from '../store/customerSlice';

interface CustomerData {
  name: string;
  age: number;
  address: string;
  userId?: number;
}

const CustomerAddForm: React.FC = () => {
  const initialValues: CustomerData = {
    name: '',
    age: 0,
    address: '',
  };

  const dispatch = useDispatch();
  const userId = useSelector((state: any) => state.user.userId);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    age: Yup.number()
      .typeError('Age must be a number')
      .positive('Age must be positive')
      .required('Age is required'),
    address: Yup.string().required('Address is required'),
  });

  const onSubmit = async (values: CustomerData, { resetForm }: { resetForm: () => void }) => {
    console.log(selectedImage);

    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('age', values.age.toString()); // Convert age to string
    formData.append('address', values.address);
    formData.append('userId', userId); // Convert userId to string if it exists
    formData.append('imagePath', selectedImage || ''); // Handle the case where selectedImage is null

    try {
      const res = await fetch(`http://localhost:8000/api/v1/customer/create-customer`, {
        method: 'POST',
        body: formData,
      });
      const response = await res.json();
      if (response.success) {
        dispatch(addCustomer(response.customer));
        toast.success(response.message);
        const fileInput:any = document.querySelector('input[type="file"]');
        if (fileInput) {
          fileInput.value = '';
        }
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('An error occurred while submitting the form.');
    }

    resetForm();
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add Customer</h2>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-600">
              Name
            </label>
            <Field type="text" id="name" name="name" className="w-full p-2 border rounded-md" />
            <ErrorMessage name="name" component="div" className="text-red text-sm" />
          </div>
          <div>
            <label htmlFor="age" className="block text-gray-600">
              Age
            </label>
            <Field type="number" id="age" name="age" className="w-full p-2 border rounded-md" />
            <ErrorMessage name="age" component="div" className="text-red text-sm" />
          </div>
          <div>
            <label htmlFor="address" className="block text-gray-600">
              Address
            </label>
            <Field type="text" id="address" name="address" className="w-full p-2 border rounded-md" />
            <ErrorMessage name="address" component="div" className="text-red text-sm" />
          </div>
          <div>
            <label htmlFor="image" className="block text-gray-600">
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={(event) => {
                const file = event.currentTarget.files && event.currentTarget.files[0];
                setSelectedImage(file);
              }}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="text-center">
            <button type="submit" className="bg-blue text-white p-2 rounded-md w-full">
              Add Customer
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default CustomerAddForm;
