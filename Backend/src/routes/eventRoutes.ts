import { Router } from "express";
import EventController from "../controllers/eventController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/getAllEvent", EventController.getAllEvents);

router.post("/", authMiddleware, EventController.createEvent);
router.get("/created", authMiddleware, EventController.getCreatedEvents);
router.get("/registered", authMiddleware, EventController.getRegisteredEvents);

router.get("/:id", authMiddleware, EventController.getEventById);
router.put("/:id", authMiddleware, EventController.updateEvent);
router.delete("/:id", authMiddleware, EventController.deleteEvent);
router.post("/:id/register", authMiddleware, EventController.registerEvent);
router.post("/:id/unregister", authMiddleware, EventController.unregisterEvent);

router.get("/", authMiddleware, EventController.getAllEvents);

export default router;
