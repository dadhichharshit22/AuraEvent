import { Router } from 'express';
import EventController from '../controllers/eventController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Public routes
router.get('/events', EventController.getAllEvents); // List all events

// Protected routes (authMiddleware ensures the user is authenticated)
router.post('/', authMiddleware, EventController.createEvent); // Create a new event
router.get('/created', authMiddleware, EventController.getCreatedEvents); // Get events created by the user
router.get('/registered', authMiddleware, EventController.getRegisteredEvents); // Get events registered by the user

router.get('/:id', authMiddleware, EventController.getEventById); // Get event by ID
router.put('/:id', authMiddleware, EventController.updateEvent); // Update an event by ID
router.delete('/:id', authMiddleware, EventController.deleteEvent); // Delete event by ID

router.post('/:id/register', authMiddleware, EventController.registerEvent); // Register for an event
router.post('/:id/unregister', authMiddleware, EventController.unregisterEvent); // Unregister from an event

export default router;
