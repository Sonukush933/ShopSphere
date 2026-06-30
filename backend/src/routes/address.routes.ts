import { Router } from "express";
import {
  createAddress,
  getMyAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
} from "../controllers/address.controller";
import { verifyJWT } from "../middleware/auth.middleware";

const router = Router();

router
  .route("/")
  .post(verifyJWT, createAddress)
  .get(verifyJWT, getMyAddresses);

router
  .route("/:id")
  .get(verifyJWT, getAddressById)
  .put(verifyJWT, updateAddress)
  .delete(verifyJWT, deleteAddress);

export default router;