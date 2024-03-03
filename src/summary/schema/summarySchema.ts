// schemas.ts
import { Type, Static } from '@fastify/type-provider-typebox'

export const FinancialSummaryRequest = Type.Object({
    startDate: Type.String({ format: 'date' }),
    endDate: Type.String({ format: 'date' }),
});

export type FinancialSummaryRequestType = Static<typeof FinancialSummaryRequest>;
