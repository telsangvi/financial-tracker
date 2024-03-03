// userSchemas.ts
import { Type, Static } from '@fastify/type-provider-typebox';

export const RegisterUserRequest = Type.Object({
    username: Type.String(),
    email: Type.String({ format: 'email' }),
    password: Type.String(),
});

export const AuthenticateUserRequest = Type.Object({
    email: Type.String({ format: 'email' }),
    password: Type.String(),
});

export type RegisterUserRequestType = Static<typeof RegisterUserRequest>;
export type AuthenticateUserRequestType = Static<typeof AuthenticateUserRequest>;
