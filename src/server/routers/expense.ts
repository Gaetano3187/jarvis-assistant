import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';

export const expenseRouter = router({
  add: protectedProcedure
    .input(z.object({
      categoryId: z.string(),
      amount: z.number().positive(),
      date: z.date(),
      note: z.string().optional(),
      receiptUrl: z.string().optional(),
    }))
    .mutation(({ ctx, input }) =>
      ctx.prisma.expense.create({
        data: { ...input, userId: ctx.session.user.id },
      })
    ),

  byMonth: protectedProcedure
    .input(z.object({ year: z.number(), month: z.number() }))
    .query(({ ctx, input }) =>
      ctx.prisma.expense.findMany({
        where: {
          userId: ctx.session.user.id,
          date: {
            gte: new Date(input.year, input.month - 1, 1),
            lt:  new Date(input.year, input.month, 1),
          },
        },
        include: { category: true },
      })
    ),
});
