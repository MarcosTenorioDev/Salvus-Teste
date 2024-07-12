import { IUser, IUserCreate, UserRepository } from "../interfaces/user.interface";

class UserUseCase{
    async deleteByClerk(externalId: any) {
        const findId = await this.userRepository.findUserByExternalId(externalId);
        if (!findId) throw new Error('User not found');
        return await this.userRepository.delete(findId.id);
    }
    private userRepository: UserRepository;

    constructor(userRepository:UserRepository){
        this.userRepository = userRepository
    }

    async create({ externalId, firstName, lastName, email }:IUserCreate): Promise<IUser>{
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('Email already exists');
        }
        return this.userRepository.create({ externalId, firstName, lastName, email });
    }
}

export {UserUseCase}