import React from "react";

import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type UserFormDetails = {
  firstName: string;
  lastName: string;
  age: number;
};
export default function App() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserFormDetails>();

  return (
    <>
      <form onSubmit={handleSubmit(console.log)}>
        <label htmlFor="firstName">First Name</label>
        <input
          {...register("firstName", { required: true, maxLength: 20 })}
          placeholder="John"
        />
        {errors.firstName && <p>{errors.firstName.type}</p>}
        <br />
        <label htmlFor="lastName">Last Name</label>
        <input
          {...register("lastName", { pattern: /^[A-Za-z]+$/i })}
          placeholder="Doe"
        />
        {errors.lastName && <p>{errors.lastName.type}</p>}
        <br />
        <label htmlFor="age">Age</label>
        <input
          type="number"
          {...register("age", { min: 18, max: 99 })}
          placeholder="18"
        />
        {errors.age && <p>{errors.age.type}</p>}
        <br />
        <input type="submit" />
      </form>
      <DevTool control={control} />
    </>
  );
}
