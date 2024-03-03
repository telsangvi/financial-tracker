// categorySchemas.ts
import { Type, Static } from '@fastify/type-provider-typebox';

export const AddCategoryRequest = Type.Object({
    categoryName: Type.String(),
});

export const UpdateCategoryRequest = Type.Object({
    categoryName: Type.String(),
});

export const ObjectIdParam = Type.Object({
    categoryId: Type.String({ format: 'objectId' }),
});

export type ObjectIdParamType = Static<typeof ObjectIdParam>;

export type AddCategoryRequestType = Static<typeof AddCategoryRequest>;
export type UpdateCategoryRequestType = Static<typeof UpdateCategoryRequest>;
