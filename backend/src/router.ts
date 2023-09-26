import express from "express";
import * as taskControllers from "./controllers/taskControllers";
import * as tagControllers from "./controllers/tagControllers";

const router = express.Router();

router.post("/task", taskControllers.createTask);

router.get("/task", taskControllers.getAllTasks);

router.get("/task/:id", taskControllers.getTaskById);

router.put("/task/:id", taskControllers.updateTask);

router.delete("/task/:id", taskControllers.deleteTask);

//Routes pour les Tags
router.post("/tag", tagControllers.createTag);

router.get("/tag", tagControllers.getAllTags);

router.get("/tag/:id", tagControllers.getTagById);

router.put("/tag/:id", tagControllers.updateTag);

router.delete("/tag/:id", tagControllers.deleteTag);

export default router;
