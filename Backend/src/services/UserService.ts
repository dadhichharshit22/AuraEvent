import { UserRepository } from "../repositories/userRepositories";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getUserById(userId: string) {
    return await this.userRepository.findById(userId);
  }
}
