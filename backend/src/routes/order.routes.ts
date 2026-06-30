import { Router } from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/order.controller";
import { verifyJWT } from "../middleware/auth.middleware";
import { authorizeRoles } from "../middleware/role.middleware";
import { USER_ROLES } from "../constants/roles";

const router = Router();

router
  .route("/")
  .post(verifyJWT, createOrder)
  .get(verifyJWT, getMyOrders);

router
  .route("/:id")
  .get(verifyJWT, getOrderById);

router
  .route("/:id/status")
  .put(
    verifyJWT,
    authorizeRoles(USER_ROLES.ADMIN),
    updateOrderStatus
  );

export default router;