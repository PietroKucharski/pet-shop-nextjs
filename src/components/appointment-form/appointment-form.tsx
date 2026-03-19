'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';

const appointmentsFormSchema = z.object({
  tutorName: z.string().min(3, 'O nome do tutor é obrigatório'),
  // petName: z.string().min(3, 'O nome do pet é obrigatório'),
  // phone: z.string().min(11, 'O telefone é obrigatório'),
  // description: z.string().min(3, 'A descrição é obrigatória'),
});

type AppointmentsFormValues = z.infer<typeof appointmentsFormSchema>;

export const AppointmentForm = () => {
  const form = useForm<AppointmentsFormValues>({
    resolver: zodResolver(appointmentsFormSchema),
    defaultValues: {
      tutorName: '',
      // petName: '',
      // phone: '',
      // description: '',
    },
  });

  const onSubmit = (data: AppointmentsFormValues) => {
    console.log(data);
  };

  const onError = (errors: any) => {
    console.log('ERROS', errors);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="brand">Novo Agendamento</Button>
      </DialogTrigger>

      <DialogContent
        variant="appointment"
        overlayVariant="blurred"
        showCloseButton
      >
        <DialogHeader>
          <DialogTitle size="modal">Agende um atendimento</DialogTitle>
          <DialogDescription size="modal">
            Preencha os dados do cliente para realizar o agendamento
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit, onError)}>
          <FieldGroup>
            <Controller
              name="tutorName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Nome do Tutor</FieldLabel>
                  <Input {...field} id={field.name} />
                </Field>
              )}
            ></Controller>
            <Button type="submit">Submit</Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
};
