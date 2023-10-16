import express from 'express';

import { createRole, getAllRoles, updateRole, deleteRole } from '../controllers/role.controller.js';

const router = express.Router();

// Create new role in DB
router.post("/create", createRole)

//Update role in DB
router.put("/update/:id", updateRole);

//Get all roles from DB
router.get("/getAll", getAllRoles);

// Delete role from DB
router.delete("/delete/:id", deleteRole);

export default router;
