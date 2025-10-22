import {
  CreateUserRequest,
  UpdateUserRequest,
  User,
} from "../../src/models/user.model";
import { InMemoryUserRepository } from "../../src/repositories/in-memory-user.repository";

describe("Repository - Unit Test", () => {
  let userRepository: InMemoryUserRepository;
  let mockUsers: Map<string, User>;
  let user: User;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    mockUsers = new Map();

    user = {
      id: "1",
      name: "dante",
      email: "dante@example",
      age: 21,
      createdAt: new Date(),
      isActive: true,
    };

    mockUsers.set(user.id, user);

    (userRepository as any).users = mockUsers;
  });

  describe("Find by Id", () => {
    it("debería devolver un usuario por id", async () => {
      const result = await userRepository.findById("1");

      expect(result).toEqual(user);
    });

    it("debería retornar null para usuario inexistente", async () => {
      const result = await userRepository.findById("2");

      expect(result).toEqual(null);
    });
  });

  describe("Find by Email", () => {
    it("debería devolver un usuario por email", async () => {
      const result = await userRepository.findByEmail("dante@example");

      expect(result).toEqual(user);
    });

    it("debería retornar nulo para usuario inexistente", async () => {
      const result = await userRepository.findByEmail("bad@example");

      expect(result).toEqual(null);
    });
  });

  describe("Create User", () => {
    it("deberia devolver un usuario creado", async () => {
      const validUserData: CreateUserRequest = {
        name: "Nuevo usuario",
        email: "nuevo@example",
        age: 19,
      };

      const expectedUser: User = {
        id: "1",
        name: validUserData.name,
        email: validUserData.email,
        age: validUserData.age,
        createdAt: new Date(),
        isActive: true,
      };

      const result = await userRepository.create(validUserData);

      expect(result).toEqual(expectedUser);
    });
  });

  describe("Update User", () => {
    const updateData: UpdateUserRequest = {
      name: "Dante Actualizado",
      age: 26,
      email: "dante@example.com",
      isActive: false,
    };

    it("debería devolver el usuario actualizado", async () => {
      const updatedUser: User = {
        id: user.id,
        name: updateData.name!,
        email: updateData.email!,
        age: updateData.age!,
        createdAt: user.createdAt,
        isActive: updateData.isActive!,
      };
      const result = await userRepository.update("1", updateData);

      expect(result).toEqual(updatedUser);
    });

    it("debería retornar nulo para usuario inexistente", async () => {
      const result = await userRepository.update("2", updateData);

      expect(result).toEqual(null);
    });
  });

  describe("Delete User", () => {
    it("debería devolver true al eliminarse un usuario", async () => {
      const result = await userRepository.delete("1");

      expect(result).toEqual(true);
    });
  });

  describe("Find All Users", () => {
    it("debería devolver un array con todos los usuarios", async () => {
      const expectedUsers = Array.from(mockUsers.values());
      const result = await userRepository.findAll();

      expect(result).toEqual(expectedUsers);
    });
  });
});
