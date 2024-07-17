"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import Ticket from "../(models)/Ticket";

const createSchema = z.object({
  id: z.string(),
  name: z.string(),
  surname: z.string(),
  iban: z.string(),
  withdrawAmount: z.coerce.number().int(),
  description: z.string(),
  status: z.string(),
});

export async function getTicket(status: string) {
  switch (status) {
    case "PENDING":
      return await Ticket.find({ status: "PENDING" });
    case "APPROVED":
      return await Ticket.find({ status: "APPROVED" });
    case "CANCELLED":
      return await Ticket.find({ status: "CANCELLED" });
    default:
      throw new Error("Invalid status");
  }
}

export async function createTicket(prevState: unknown, formData: FormData) {
  const result = createSchema.safeParse(Object.fromEntries(formData.entries()));

  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  await Ticket.create({
    name: data.name,
    surname: data.surname,
    iban: data.iban,
    withdrawAmount: data.withdrawAmount,
    description: data.description,
    status: "PENDING",
  });

  redirect(`/agent/${data.id}`);
}

export async function editTicket(prevState: unknown, formData: FormData) {
  const result = createSchema.safeParse(Object.fromEntries(formData.entries()));

  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  await Ticket.updateOne(
    {
      _id: data.id,
    },
    {
      $set: data,
    }
  );

  redirect("/home");
}

export async function deleteTicket(id: string) {
  await Ticket.deleteOne({
    _id: id,
  });
}
