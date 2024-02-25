'use server';

import { currentUser } from '@clerk/nextjs';
import prisma from '../lib/prisma';
import { FormSchema, formSchema } from '@/schemas/form';

class UserNotFound extends Error {}

export async function GetFormStats() {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFound();
  }

  const stats = await prisma.form.aggregate({
    where: {
      userId: user.id,
    },
    _sum: {
      visits: true,
      submissions: true,
    },
  });

  const visits = stats._sum.visits || 0;
  const submissions = stats._sum.submissions || 0;
  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissions;

  return { visits, submissions, bounceRate, submissionRate };
}

export async function CreateForm(data: FormSchema) {
  const validation = formSchema.safeParse(data);
  if (!validation.success) {
    throw new Error('Form not valid');
  }

  const user = await currentUser();
  if (!user) {
    throw new UserNotFound();
  }

  const formExist = await prisma.form.findFirst({
    where: {
      name: data.name,
    },
  });

  if (formExist) {
    throw new Error('Form already exists');
  }

  const form = await prisma.form.create({
    data: {
      userId: user.id,
      name: data.name,
      description: data.description,
    },
  });

  if (!form) {
    throw new Error('something went wrong');
  }

  return form.id;
}

export async function GetForms() {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFound();
  }

  return await prisma.form.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function GetFormById(id: number) {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFound('U not login');
  }

  return await prisma.form.findUnique({
    where: {
      id,
    },
  });
}

export async function UpdateFormContent(json: string, id: number) {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFound('U not login');
  }
  return await prisma.form.update({
    where: {
      id,
      userId: user.id,
    },
    data: {
      content: json,
    },
  });
}
