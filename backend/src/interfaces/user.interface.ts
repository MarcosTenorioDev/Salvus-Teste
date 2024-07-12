export interface IUser {
    id: string;
    externalId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone:string | null
}
export interface IUserCreate {
    externalId: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface UserRepository {
    create(data: IUserCreate): Promise<IUser>;
    findByEmail(email: string): Promise<IUser | null>;
}
