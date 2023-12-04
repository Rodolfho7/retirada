import { object, string } from 'yup';

export const defaultSchema = object({
  pais: string().required(),
  agenciaRetirada: string().required(),
  agenciaDevolucao: string().required(),
  dataRetirada: string().required(),
  horaRetirada: string().required(),
  dataDevolucao: string().required(),
  horaDevolucao: string().required(),
  linhaAerea: string().required(),
  numeroVoo: string().required()
});
