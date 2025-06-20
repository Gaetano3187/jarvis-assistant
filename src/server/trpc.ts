import { initTRPC, TRPCError } from '@trpc/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const t = initTRPC.context<{
  session: Awaited<ReturnType<typeof getServerSession>>;
  prisma: typeof prisma;
}>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  const session = await getServerSession(authOptions);
  if (!session) throw new TRPCError({ code: 'UNAUTHORIZED' });
  return next({
    ctx: { ...ctx, session },
  });
});
