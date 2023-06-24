export type UserT = {
    openID: string;
    nickName: string;
    avatarUrl: string;
    userAccess: UserAccess;
};

export enum UserAccess {
    Admin = 'ADMIN',
    User = 'USER',
};

export type userLogInResponse = {
    code: number;
    message: string;
    userInfo: UserT | undefined;
}

export type TabT = {
    title: string;
}