'use server';

import { z } from 'zod';
import { client } from './pg-client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '../auth';
import { AuthError } from 'next-auth';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer'
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.'}),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status',
  }),
  date: z.string(),
});

const UpdateInvoice = FormSchema.omit({ id: true, date: true})

const CreateInvoice = FormSchema.omit({ id: true, date: true })

export type State = {
  errors?: {
    customerId?: string[],
    amount?: string[],
    status?: string[],
  },
  message?: string | null,
}

// Behind the scenes, Server Actions create a POST API endpoint. This is why you don't need to
// create API endpoints manually when using Server Actions.
export async function createInvoice(prevState: State, formData: FormData) {
  // Validate form using Zod
  // safeParse() will return an object containing either a success or error
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status')
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to create an invoice.'
    };
  };

  // Prepare data for insertion into the database 
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  // Insert data into the database
  try {
    await client.query(`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES ($1, $2, $3, $4);
    `, [customerId, amountInCents, status, date]);
  } catch (error) {
    return {
      message: 'Database Error: Failed to create an invoice',
    }
  }

  // Once the database has been updated, the /dashboard/invoices path will be revalidated, and fresh
  // data will be fetched from the server.
  revalidatePath('/dashboard/invoices');

  // Now we redirect the the user back to the /dashboard/invoices page.
  redirect('/dashboard/invoices');
}

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100
  try {
    await client.query(`
      UPDATE invoices
      SET customer_id = $1, amount = $2, status = $3
      WHERE id = $4;
    `, [customerId, amountInCents, status, id]);
  } catch (error) {
    return {
      message: 'Database Error: Failed to update invoice',
    }
  }

  revalidatePath('/dashboard/invoices')
  redirect('/dashboard/invoices')
}

export async function deleteInvoice(id: string) {
  // In this case we'll get an Unhandled Runtime Error in the browser, when trying to delete an
  // invoice
  // throw new Error('Failed to Delete Invoice');

  try {
    await client.query(`
      DELETE FROM invoices
      WHERE id = $1;
    `, [id]);
  } catch (error) {
    return {
      message: 'Database Error: Failed to delete invoice.',
    }
  }

  revalidatePath('/dashboard/invoices');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
