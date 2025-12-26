export interface UserRepository {
  findAll(): Promise<any[]>;
  findById(id: string): Promise<any | null>;
  create(data: {
    email: string;
    password: string;
    fullName: string;
  }): Promise<any>;
}