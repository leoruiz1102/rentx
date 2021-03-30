import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

export interface IUsersRepository {
  create(createDTO: ICreateUserDTO): Promise<void>;
  findByUsername(username: string): Promise<User>;
}
