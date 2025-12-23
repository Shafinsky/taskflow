"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServiceCore = void 0;
class UserServiceCore {
    constructor(repo) {
        this.repo = repo;
    }
    getAllUsers() {
        return this.repo.findAll();
    }
    getUserById(id) {
        return this.repo.findById(id);
    }
    createUser(email) {
        return this.repo.create({
            email,
            password: 'test-password',
            fullName: 'Test User',
        });
    }
}
exports.UserServiceCore = UserServiceCore;
