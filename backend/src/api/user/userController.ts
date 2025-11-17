import type { Request, RequestHandler, Response } from "express";

import { userService } from "@/api/user/userService";

class UserController {
  public registerUser: RequestHandler = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const serviceResponse = await userService.register(name, email, password);
    res.status(serviceResponse.statusCode).send(serviceResponse);
  };

  public loginUser: RequestHandler = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const serviceResponse = await userService.login(email, password);
    res.status(serviceResponse.statusCode).send(serviceResponse);
  };

  public getUsers: RequestHandler = async (_req: Request, res: Response) => {
    const serviceResponse = await userService.findAll();
    res.status(serviceResponse.statusCode).send(serviceResponse);
  };

  public getUser: RequestHandler = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const serviceResponse = await userService.findById(id);
    res.status(serviceResponse.statusCode).send(serviceResponse);
  };
}

export const userController = new UserController();
