import express from "express";
import {
  createPlace,
  deletePlace,
  getPlaceById,
  getPlacesByUserId,
  updatePlace,
} from "../controllers/places-controller.js";
import { check } from "express-validator";
import { upload } from "../middleware/file-upload.js";
import { checkAuth } from "../middleware/check-auth.js";

const router = express.Router();

router.get("/:placeId", getPlaceById);

router.get("/user/:userId", getPlacesByUserId);

router.use(checkAuth);

router.post(
  "/",
  upload.single("image"),
  [
    check("name").not().isEmpty().withMessage("Name cannot be empty"),
    check("description")
      .isLength({ min: 5 })
      .withMessage("Description must be at least 5 characters long"),
    check("address").not().isEmpty().withMessage("Address cannot be empty"),
  ],
  createPlace
);

router.patch(
  "/:placeId",
  [
    check("name").not().isEmpty().withMessage("Name cannot be empty"),
    check("description")
      .isLength({ min: 5 })
      .withMessage("Description must be at least 5 characters long"),
  ],
  updatePlace
);

router.delete("/:placeId", deletePlace);

export { router as placeRouter };
