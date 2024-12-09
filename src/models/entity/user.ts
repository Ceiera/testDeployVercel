interface UserEntity {
    userId: string;
    email: string;
    password: string;
    name: string;
    address?: string;
    createdAt?: Date;
    updateAt?: Date;
    deletedAt?: Date;
}

export default UserEntity;