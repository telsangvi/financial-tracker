import { Type, Static } from '@fastify/type-provider-typebox';

export const AddTransactionRequest = Type.Object({
  amount: Type.Number(),
  date: Type.String({ format: 'date' }),
  category: Type.String(),
  description: Type.String(),
  type: Type.Enum(['income', 'expense']),
});

export const ObjectIdParam = Type.Object({
  transactionId: Type.String({ format: 'objectId' }),
});

export type ObjectIdParamType = Static<typeof ObjectIdParam>;

export type AddTransactionRequestType = Static<typeof AddTransactionRequest>;

export const UpdateTransactionRequest = Type.Partial(AddTransactionRequest);

export type UpdateTransactionRequestType = Static<
  typeof UpdateTransactionRequest
>;
