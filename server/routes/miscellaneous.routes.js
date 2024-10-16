import{Router} from "express";
const router = Router();

import {contactUs, stats} from '../controllers/miscellaneous.controller.js';
import isLoggedIn from '../middlewares/auth.middleware.js';
import authorizedRoles from '../middlewares/Authorize.middleware.js';

router.post("/contact", contactUs);
router.get("/admin/stats/users", isLoggedIn, authorizedRoles("ADMIN"), stats);

export default router;