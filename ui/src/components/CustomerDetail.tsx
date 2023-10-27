import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCustomer, deleteCustomer, addCustomer } from '../store/customerSlice';
import { Delete, Get, Update } from '../helper/dbFetch';
import { toast } from 'react-toastify';

interface Customer {
  id: number;
  name: string;
  age: number;
  address: string;
  imagePath?:string
}

const CustomerDetail = () => {
  const dispatch = useDispatch();
  const customers = useSelector((state: any) => state.customer);
  const userId = useSelector((state: any) => state.user.userId);

  // Define a state variable to hold the customer data being edited
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  const handleUpdate = async (updatedCustomer: Customer) => {
    const path: string = `/api/v1/customer/update-customer/${updatedCustomer.id}`;
    console.log(updatedCustomer);

    const response: any = await Update(path, updatedCustomer);

    if (response.success) {
      toast.success(response.message);
      dispatch(updateCustomer(updatedCustomer));
      // Clear the editingCustomer state to exit edit mode
      setEditingCustomer(null);
    } else {
      toast.error(response.message);
    }
  };

  const handleDelete = async (customerId: number) => {
    const path: string = `/api/v1/customer/delete-customer/${customerId}`;
    const response: any = await Delete(path);
    console.log(response);

    if (response.success) {
      console.log("kyan: customer deleted successfully");
      toast.success(response.message);
      dispatch(deleteCustomer(customerId));
    } else {
      toast.info(response.message);
    }
  };

  useEffect(() => {
    getAllCustomer();
  }, []);

  async function getAllCustomer() {
    const path: string = `/api/v1/customer/get-all-customers/${userId}`;
    const response: any = await Get(path);
    console.log(response);
    
    if (response.success) {
      dispatch(addCustomer(response.customers));
    }
  }

  if (!customers) {
    return <div>Customer not found</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">All Customers</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Age</th>
              <th className="border px-4 py-2">Address</th>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers?.map((customer: Customer) => (
              <tr key={customer.id}>
                <td className="border px-4 py-2">
                  {editingCustomer && editingCustomer.id === customer.id ? (
                    <input
                      type="text"
                      value={editingCustomer.name}
                      onChange={(e) =>
                        setEditingCustomer({ ...editingCustomer, name: e.target.value })
                      }
                    />
                  ) : (
                    customer.name
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editingCustomer && editingCustomer.id === customer.id ? (
                    <input
                      type="text"
                      value={editingCustomer.age}
                      onChange={(e) =>
                        setEditingCustomer({ ...editingCustomer, age: parseInt(e.target.value) })
                      }
                    />
                  ) : (
                    customer.age
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editingCustomer && editingCustomer.id === customer.id ? (
                    <input
                      type="text"
                      value={editingCustomer.address}
                      onChange={(e) =>
                        setEditingCustomer({ ...editingCustomer, address: e.target.value })
                      }
                    />
                  ) : (
                    customer.address
                  )}
                </td>
                <td className="border px-4 py-2">
                  <img src={`http://localhost:8000/${customer.imagePath}`} width={150} height={180} alt='img'/>
                </td>
                <td className="border px-4 py-2 flex flex-col md:flex-row">
                  {editingCustomer && editingCustomer.id === customer.id ? (
                    <button
                      className="bg-green text-white px-4 py-2 rounded m-1"
                      onClick={() => handleUpdate(editingCustomer)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="bg-blue text-white px-4 py-2 rounded m-1"
                      onClick={() => setEditingCustomer({ ...customer })}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="bg-red text-white px-4 py-2 rounded m-1"
                    onClick={() => handleDelete(customer.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerDetail;
