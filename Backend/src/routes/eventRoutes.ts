import { Router } from 'express';
import EventController from '../controllers/eventController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { upload } from '../middlewares/uploadMiddleware';

const router = Router();


router.get('/getAllEvent', EventController.getAllEvents);


router.post('/', authMiddleware,upload.single("image"), EventController.createEvent);
router.get('/created', authMiddleware, EventController.getUserCreatedEvents);
router.get('/registered', authMiddleware, EventController.getUserRegisteredEvents);


router.get('/:id', authMiddleware, EventController.getEventById);
router.put('/:id', authMiddleware,upload.single("image"), EventController.updateEvent);
router.delete('/:id', authMiddleware, EventController.deleteEvent);
router.post('/:id/register', authMiddleware, EventController.registerForEvent);
router.post('/:id/unregister', authMiddleware, EventController.unregisterFromEvent);

router.get('/', authMiddleware, EventController.getAllEvents);

export default router;
