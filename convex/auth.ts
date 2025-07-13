import Google from "@auth/core/providers/google";
import { convexAuth } from "@convex-dev/auth/server";
import { MutationCtx } from "./_generated/server";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Google],
  callbacks: {
    async createOrUpdateUser(ctx: MutationCtx, { profile }) {
      const user = await ctx.db.insert("users", {
        balance: 0,
        name: profile.name as string,
        image: profile.image as string,
        email: profile.email as string,
      });

      return user;
    },
  },
});
