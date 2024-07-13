import { IUser, IUserCreate, UserRepository } from "../interfaces/user.interface";

class UserUseCase{
  
    private userRepository: UserRepository;

    constructor(userRepository:UserRepository){
        this.userRepository = userRepository
    }

    async create({ externalId, firstName, lastName, email }:IUserCreate): Promise<IUser>{
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('Email já existente');
        }
        return this.userRepository.create({ externalId, firstName, lastName, email });
    }

    async deleteByClerk(externalId: string) {
        const findId = await this.userRepository.findUserByExternalId(externalId);
        if (!findId) throw new Error('User not found');
        return await this.userRepository.delete(findId.id);
    }

    async findByExternalId(externalId:string):Promise<IUser | null>{
        const user = this.userRepository.findUserByExternalId(externalId)

        if (!user) {
            throw new Error(
                "Usuário não encontrado"
            );
        }

        return user
    }
}

export {UserUseCase}