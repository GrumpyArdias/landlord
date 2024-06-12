import { Router } from "express";
import propertiesController from "./propertiesController";

const router = Router();

router.get("/", propertiesController.getProperties);
router.get("/:id", propertiesController.getProperty);
router.post("/", propertiesController.createProperty);
router.put("/:id", propertiesController.updateProperty);
router.delete("/:id", propertiesController.deleteProperty);

export { router as propertiesRouter };
