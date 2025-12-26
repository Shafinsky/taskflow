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
    createUser(data) {
        return this.repo.create(data);
    }
}
exports.UserServiceCore = UserServiceCore;
