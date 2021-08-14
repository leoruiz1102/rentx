import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create(createDTO: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, { ...createDTO });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find(user => user.email === email);
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find(user => user.id === id);
    return user;
  }

  async update(updatedUser: User): Promise<void> {
    const userIndex = this.users.findIndex(user => user.id === updatedUser.id);

    this.users[userIndex] = updatedUser;
  }
}

export { UsersRepositoryInMemory };
