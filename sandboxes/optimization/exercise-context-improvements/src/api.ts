export type User = {
  id: string;
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export async function signIn(email: string, password: string): Promise<User> {
  await sleep(500);
  if (email === "admin@test.com" && password === "admin") {
    return {
      id: "admin"
    };
  }

  throw new Error("Invalid email or password");
}
