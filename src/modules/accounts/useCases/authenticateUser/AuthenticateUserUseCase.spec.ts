import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

describe("Authenticate User", () => {
  let authenticateUserUseCase: AuthenticateUserUseCase;
  let createUserUserCase: CreateUserUseCase;
  let usersRepositoryInMemory: UsersRepositoryInMemory;

  beforeAll(() => {
    process.env = Object.assign(process.env, { APP_JWT_HASH: "test_token" });
  });

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
    );
    createUserUserCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("Should be able authenticate an user", async () => {
    const user: ICreateUserDTO = {
      name: "User test",
      email: "email@test.com",
      driver_license: "driver_license_test",
      password: "password",
    };

    await createUserUserCase.execute(user);

    const auth = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(auth).toHaveProperty("token");
    expect(auth.user.name).toEqual(user.name);
    expect(auth.user.email).toEqual(user.email);
  });

  it("Should not be able authenticate user with a wrong password", async () => {
    const user: ICreateUserDTO = {
      name: "User test",
      email: "email@test.com",
      driver_license: "driver_license_test",
      password: "password",
    };

    await createUserUserCase.execute(user);

    expect(async () => {
      await authenticateUserUseCase.execute({
        email: user.email,
        password: "wrong password",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able authenticate user with a wrong email", async () => {
    const user: ICreateUserDTO = {
      name: "User test",
      email: "email@test.com",
      driver_license: "driver_license_test",
      password: "password",
    };

    await createUserUserCase.execute(user);

    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "wrong email",
        password: user.password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
