const supertest = require("supertest");
const app = require("../src/app");
const { taskToCreate, taskToUpdate, taskKeys } = require("./testsData");
import { Task } from "./types";

let task: Task;

describe("TASK ROUTES", () => {
  it("should get the task list /api/task", async () => {
    const res = await supertest(app)
      .get("/api/tasks")
      .expect(200)
      .expect("Content-Type", /json/);

    expect(Array.isArray(res.body)).toBe(true);

    res.body.forEach((task: any) => {
      taskKeys.map((prop: any) => {
        expect(task).toHaveProperty(prop);
      });
    });
  });
  it("should get a task with id 1 /api/tasks/1", async () => {
    const res = await supertest(app)
      .get("/api/tasks/1")
      .expect(200)
      .expect("Content-Type", /json/);

    expect(Array.isArray(res.body)).toBe(false);

    taskKeys.map((prop: any) => {
      expect(res.body).toHaveProperty(prop);
    });
  });

  it("should create a new task /api/tasks", async () => {
    const res = await supertest(app)
      .post("/api/tasks")
      .send(taskToCreate)
      .expect(201)
      .expect("Content-Type", /json/);

    taskKeys.map((prop: any) => {
      expect(res.body).toHaveProperty(prop);
    });

    task = res.body;
  });

  describe("update a task", () => {
    it("should update the created task /api/tasks/:id", async () => {
      await supertest(app)
        .put(`/api/tasks/${task.id}`)
        .send(taskToUpdate)
        .expect(204);

      const res = await supertest(app).get(`/api/tasks/${task.id}`);

      taskKeys.map((prop: any) => {
        expect(res.body).toHaveProperty(prop, taskToUpdate[prop]);
      });
    });

    it("should delete the created task /api/tasks/:id", async () => {
      await supertest(app).delete(`/api/tasks/${task.id}`).expect(204);
      await supertest(app).get(`/api/tasks/${task.id}`).expect(404);
    });
  });
});
