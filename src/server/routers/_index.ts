import { router } from '../trpc';
import { expenseRouter } from './expense';
// import { budgetRouter } … (da aggiungere)

export const appRouter = router({
  expense: expenseRouter,
  // budget: budgetRouter,
});

export type AppRouter = typeof appRouter;
