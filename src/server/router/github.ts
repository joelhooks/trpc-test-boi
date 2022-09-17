import { createRouter } from "./context";
import { z } from "zod";

const GithubUserSchema = z.object({
  login: z.string(),
  avatar_url: z.string(),
  public_repos: z.number()
})

export type GithubUser = z.infer<typeof GithubUserSchema>

export const githubRouter = createRouter().query("getUser", {
  input: z
    .object({
      username: z.string(),
    }),
  async resolve({ input }) {
    const user = await fetch(`https://api.github.com/users/${input.username}`).then((response) => response.json())
    return GithubUserSchema.parse(user);
  },
});
