import express from "express";
import { createCustomer, updatedCustomer, deleteCustomer, getAllCustomer } from "../controllers/customer.js";
const router = express.Router();
router.post('/create-customer', createCustomer);
router.put('/update-customer/:id', updatedCustomer);
router.delete('/delete-customer/:id', deleteCustomer);
router.get('/get-all-customers/:id', getAllCustomer);
export default router;
//# sourceMappingURL=customer.js.map