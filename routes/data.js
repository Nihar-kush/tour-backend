import express from "express";
import { discover } from "../controllers/discover.js";
import { videos } from "../controllers/videos.js";
import { specialities } from "../controllers/specialities.js";
import { destinations } from "../controllers/destinations.js";
import { hotels } from "../controllers/hotels.js";
import { recommendation } from "../controllers/recommendation.js";

const router = express.Router();

router.get("/specialities", specialities);
router.get("/destinations", destinations);
router.get("/recommendation", recommendation);
router.get("/hotels", hotels);
router.get("/discover", discover);
router.get("/videos", videos);

export default router;
