import { useQuery } from "@tanstack/react-query";
import { Retirada } from "../services/retirada.service";

export default function queryFeriados(codigoAgencia: string) {
  return useQuery({
    queryKey: ['feriados', codigoAgencia],
    queryFn: () => Retirada.getFeriados(codigoAgencia),
    refetchOnWindowFocus: false,
    enabled: !!codigoAgencia
  });
}
