import React from "react";

import {
  useForm,
  FormProvider,
  useController,
  Controller,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField as MuiTextField,
} from "@mui/material";

const UserSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(4),
  age: z.number().positive().min(18).max(99),
  age2: z.number().positive().min(18).max(99),
});

type UserFormDetails = z.infer<typeof UserSchema>;

function SelectField(
  props: React.ComponentProps<typeof Select> & {
    name: string;
  }
) {
  return (
    <Controller
      {...props}
      render={({ field, fieldState: { error } }) => (
        <FormControl
          fullWidth
          error={Boolean(error)}
          variant="standard"
          style={{ margin: "0.5rem 0.8rem" }}
        >
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            label="Age"
            {...props}
            {...field}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}

function TextField(
  props: React.ComponentProps<typeof MuiTextField> & { name: string }
) {
  const { field, fieldState } = useController({ name: props.name });
  const { error } = fieldState;
  return (
    <>
      <MuiTextField
        {...props}
        fullWidth
        variant="filled"
        {...field}
        helperText={error?.message}
        error={Boolean(error)}
        style={{ margin: "0.5rem 0.8rem" }}
      />
    </>
  );
}

TextField.displayName = "TextField";

export default function App() {
  const methods = useForm<UserFormDetails>({
    defaultValues: {
      firstName: "",
      lastName: "",
      age: 10,
      age2: 10,
    },
    resolver: zodResolver(UserSchema),
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(console.log)}>
        <TextField label="First Name" name="firstName" />
        <TextField label="Last Name" name="lastName" />
        <SelectField label="Age" name="age" />
        <SelectField label="Age 2" name="age2" />
        <Button type="submit" color="primary" variant="contained">
          Submit
        </Button>
      </form>
    </FormProvider>
  );
}
