import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

export interface IUsersRepository {
  create(createDTO: ICreateUserDTO): Promise<void>;
  findByEmail(username: string): Promise<User>;
  findById(id: string): Promise<User>;
}
