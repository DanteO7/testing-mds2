import { CreateUserRequest, User } from "../../src/models/user.model";
import { InMemoryUserRepository } from "../../src/repositories/in-memory-user.repository";

describe("Repository - Unit Test", () => {
  const userRepository = new InMemoryUserRepository();
  let mockUsers: Map<string, User> = new Map();

  const user: User = {
    id: "1",
    name: "string",
    email: "dante@example",
    age: 21,
    createdAt: new Date(),
    isActive: true,
  };

  mockUsers.set(user.id, user);

  describe("Find by Id", () => {
    const userId = "1";
    it("deberia devolver un usuario por id", async () => {
      const result = await userRepository.findById(userId);

      expect(result).toEqual(user);
    });
  });

  describe("Create User", () => {
    const validUserData: CreateUserRequest = {
      name: "Juan Pérez",
      email: "juan@example.com",
      age: 25,
    };

    it("deberia devolver un usuario creado", async () => {});
  });
});
