import express from "express";
import { getsearchHistory, removeItemFromSearchHistory, searchMovie, searchPerson, searchTv } from "../controller/search.controller.js";

const router = express.Router();

// name of the person you want to search for
router.get("/person/:query", searchPerson);
router.get("/movie/:query", searchMovie);
router.get("/tv/:query", searchTv);

router.get("/history", getsearchHistory);

router.delete("/history/:id", removeItemFromSearchHistory);

export default router;