import { inject, injectable } from "tsyringe";

import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) { } // eslint-disable-line

  async execute({ name, description }: IRequest) {
    const specificationAlreadyExists = await this.specificationsRepository.findByName(
      name
    );

    if (specificationAlreadyExists)
      throw new Error("Specfication already exists with this name!");

    this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };