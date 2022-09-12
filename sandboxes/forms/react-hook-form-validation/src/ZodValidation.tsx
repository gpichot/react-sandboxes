import React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const UserSchema = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string(),
  age: z.preprocess(
    (s: string) => Number.parseInt(s),
    z.number().nonnegative().int().min(18).max(99)
  ),
});

type UserFormDetails = z.infer<typeof UserSchema>;

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormDetails>({
    resolver: zodResolver(UserSchema),
  });

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <label htmlFor="firstName">First Name</label>
      <input {...register("firstName")} placeholder="John" />
      {errors.firstName && <p>{errors.firstName.type}</p>}
      <br />
      <label htmlFor="lastName">Last Name</label>
      <input {...register("lastName")} placeholder="Doe" />
      {errors.lastName && <p>{errors.lastName.type}</p>}
      <br />
      <label htmlFor="age">Age</label>
      <input type="number" {...register("age")} placeholder="18" />
      {errors.age && <p>{errors.age.type}</p>}
      <br />
      <input type="submit" />
    </form>
  );
}
