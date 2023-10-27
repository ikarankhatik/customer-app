import express, { Request, Response } from 'express';
import db from "../models/index.js";
const Customer = db.customer;
const router = express.Router();
import multer from 'multer'

const upload = multer({ dest: "./uploads/" });
// Create a new customer
export const createCustomer = async (req: Request, res: Response) => {
  upload.single("imagePath")(req, res, async (err:any) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: "Error uploading file" });
    }
    // git push https://ikarankhatik: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@github.com/ikarankhatik/customer-app.git

    try {
      const { name, age, address, userId } = req.body;
      const imagePath =  req.file.path; // Get the uploaded image path

      // Create the customer with the image path and userId
      const customer = await Customer.create({ name, age, address, imagePath, userId });

      return res.status(201).json({ customer, success: true, message: "Customer Added successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Error creating customer" });
    }
  });
};


// Update a customer by ID
export const updatedCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await Customer.update(req.body, { where: { id } });
    if (updated) {
      const updatedCustomer = await Customer.findByPk(id);
      return res.status(200).json({updatedCustomer, success:true, message:'Customer updated successfully'});
    }
    return res.status(404).json({ error: 'Customer not found' });
  } catch (error) {
    return res.status(500).json({ error: 'Error updating customer' });
  }
};

// Delete a customer by ID
export const deleteCustomer = async (req: Request, res: Response) => {
  try {

    const { id } = req.params;
    const deleted = await Customer.destroy({ where: { id } });


    if (deleted) {

      return res.status(201).json({ message: 'Customer deleted successfully', success: true });
    }
    return res.status(404).json({ error: 'Customer not found', success: false });
  } catch (error) {
    return res.status(500).json({ error: 'Error deleting customer' });
  }
};

// Get all customers
export const getAllCustomer = async (req: Request, res: Response) => {
  try {
    const customers = await Customer.findAll({ where: { userId: req.params.id } });
    return res.status(200).json({ customers, success: true, message: 'customer data fetched successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching customers' });
  }
};

export default router;
