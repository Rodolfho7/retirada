import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import Pais from "../components/pais/pais";
import Agencias from "../components/agencias/agencias";
import { QueryClientProvider } from "@tanstack/react-query";
import DataHoraRetirada from "../components/data-hora-retirada/data-hora-retirada";
import { FormsModel } from "../models/retirada.model";
import styles from './retirada.module.css';
import DataHoraDevolucao from "../components/data-hora-devolucao/data-hora-devolucao";
import LinhaAerea from "../components/linha-aerea/linha-aerea";
import { yupResolver } from "@hookform/resolvers/yup";
import { defaultSchema } from "../validations/schema";
import queryClient from "../services/queryClient";

interface RetiradaProps {
  values?: FormsModel
}

function RetiradaMelhoradaRadix({ values }: RetiradaProps) {
  const context = useForm<FormsModel>({
    defaultValues: values,
    resolver: yupResolver(defaultSchema),
    mode: 'all'
  });

  const { watch, handleSubmit } = context;

  const onSubmit = (data: any) => console.log(data);

  useEffect(() => {
    const subscription = watch((values) => {
      console.log(values);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <QueryClientProvider client={queryClient}>
      <FormProvider {...context}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles['form']}>
          <Pais />
          <Agencias />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <DataHoraRetirada />
            <DataHoraDevolucao />
          </div>
          <LinhaAerea />
          <button type="submit">Salvar</button>
        </form>
      </FormProvider>
    </QueryClientProvider>
  )
}

export default RetiradaMelhoradaRadix;
