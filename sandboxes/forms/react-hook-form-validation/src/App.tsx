import React from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string(),
  age: yup.number().required().positive().integer().min(18).max(99),
});

type UserFormDetails = yup.InferType<typeof schema>;

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormDetails>({
    resolver: yupResolver(schema),
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
