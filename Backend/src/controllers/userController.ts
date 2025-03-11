import { Request, Response } from "express";
import { UserService } from "../services/userService";

interface AuthRequest extends Request {
  user?: { id: string };
}

// Controller responsible for handling user-related requests.
 
export class UserController {
  constructor(private readonly userService: UserService) {}

  
    // Handles a request to fetch the user profile.
   
  async getUserProfile(req: AuthRequest, res: Response): Promise<void> {
    if (!this.hasValidUser(req)) return this.respondWithBadRequest(res);

    try {
      const user = await this.fetchUserById(req.user!.id);
      this.respondWithSuccess(res, user);
    } catch (error) {
      this.handleError(res, error);
    }
  }



  // Checks if the request contains a valid user ID. 
  private hasValidUser(req: AuthRequest): boolean {
    return !!req.user?.id;
  }

 

  // Retrieves a user by ID from the service layer. Throws an error if the user is not found. 
  private async fetchUserById(userId: string) {
    const user = await this.userService.getUserById(userId);
    if (!user) throw new UserNotFoundError();
    return user;
  }

  
  // Handles errors gracefully and sends appropriate responses. 
  private handleError(res: Response, error: unknown): void {
    if (error instanceof UserNotFoundError) {
      return this.respondWithError(res, 404, error.message);
    }

    console.error("Error fetching user profile:", error);
    this.respondWithError(res, 500, "Internal Server Error", error);
  }


  // Sends a 200 OK response with the user data. 
  private respondWithSuccess(res: Response, user: unknown): void {
    res.status(200).json(user);
  }

 
  private respondWithBadRequest(res: Response): void {
    this.respondWithError(res, 400, "User ID is required");
  }

  private respondWithError(res: Response, status: number, message: string, error?: unknown): void {
    res.status(status).json({
      message,
      error: error instanceof Error ? error.message : undefined,
    });
  }
}


class UserNotFoundError extends Error {
  constructor() {
    super("User not found");
  }
}
