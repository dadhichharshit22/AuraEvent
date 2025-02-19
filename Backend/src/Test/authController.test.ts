import request from "supertest";
import express, { Request, Response } from "express";
import { AuthenticationController } from "../controllers/authController";
import { RegistrationService } from "../services/RegistrationService";
import { LoginService } from "../services/LoginService";
import { PasswordChangeService } from "../services/PasswordChangeService";


const mockRegistrationService = {
  register: jest.fn((req: Request, res: Response) => res.status(201).json({ message: "User registered" }))
};

const mockLoginService = {
  login: jest.fn((req: Request, res: Response) => res.status(200).json({ token: "mockToken" }))
};

const mockPasswordChangeService = {
  changePassword: jest.fn((req: Request, res: Response) => res.status(200).json({ message: "Password changed" }))
};


const authController = new AuthenticationController(
  mockRegistrationService as unknown as RegistrationService,
  mockLoginService as unknown as LoginService,
  mockPasswordChangeService as unknown as PasswordChangeService
);


const app = express();
app.use(express.json());

app.post("/api/auth/register", (req, res) => authController.register(req, res));
app.post("/api/auth/login", (req, res) => authController.login(req, res));
app.post("/api/auth/change-password", (req, res) => authController.changePassword(req, res));

describe("AuthenticationController API", () => {
  test("POST /api/auth/register should register a user", async () => {
    const res = await request(app).post("/api/auth/register").send({ username: "test", password: "password123" });

    expect(res.status).toBe(201);
    expect(res.body).toEqual({ message: "User registered" });
    expect(mockRegistrationService.register).toHaveBeenCalledTimes(1);
  });

  test("POST /api/auth/login should authenticate user", async () => {
    const res = await request(app).post("/api/auth/login").send({ username: "test", password: "password123" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ token: "mockToken" });
    expect(mockLoginService.login).toHaveBeenCalledTimes(1);
  });

  test("POST /api/auth/change-password should change password", async () => {
    const res = await request(app).post("/api/auth/change-password").send({ oldPassword: "oldPass", newPassword: "newPass" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Password changed" });
    expect(mockPasswordChangeService.changePassword).toHaveBeenCalledTimes(1);
  });
});
