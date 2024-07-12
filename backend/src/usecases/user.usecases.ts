import { IUser, IUserCreate, UserRepository } from "../interfaces/user.interface";

class UserUseCase{
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