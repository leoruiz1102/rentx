import { ICreateSpecificationDTO } from "../dtos/ICreateSpecificationDTO";
import { Specification } from "../entities/Specification";

interface ISpecificationsRepository {
  create(createDto: ICreateSpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specification>;
}

export { ISpecificationsRepository };
