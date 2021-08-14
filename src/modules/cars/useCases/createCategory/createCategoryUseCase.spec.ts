import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

describe("Create Category", () => {
  let createCategoryUseCase: CreateCategoryUseCase;
  let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory,
    );
  });

  it("Should be able to creat a new category", async () => {
    const newCategory = {
      name: "Category test",
      description: "Category description test",
    };

    await createCategoryUseCase.execute(newCategory);

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      newCategory.name,
    );

    expect(categoryCreated).toHaveProperty("id");
    expect(categoryCreated.name).toBe(newCategory.name);
  });

  it("Should not be able to creat a new category with a existent name", async () => {
    const newCategory = {
      name: "Category test",
      description: "Category description test",
    };

    await createCategoryUseCase.execute(newCategory);

    expect(async () => {
      await createCategoryUseCase.execute(newCategory);
    }).rejects.toBeInstanceOf(AppError);
  });
});
