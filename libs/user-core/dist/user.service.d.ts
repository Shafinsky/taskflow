import type { UserRepository } from './user.repository';
export declare class UserServiceCore {
    private readonly repo;
    constructor(repo: UserRepository);
    getAllUsers(): Promise<any[]>;
    getUserById(id: string): Promise<any>;
    createUser(data: {
        email: string;
        password: string;
        fullName: string;
    }): Promise<any>;
}
