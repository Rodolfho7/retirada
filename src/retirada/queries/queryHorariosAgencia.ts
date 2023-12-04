import { useQuery } from "@tanstack/react-query";
import { Retirada } from "../services/retirada.service";

export default function queryHorariosAgencias(codigoAgencia: string, data: string) {
  return useQuery({
    queryKey: ['agencias', codigoAgencia, data],
    queryFn: () => Retirada.getHorariosAgencia(codigoAgencia, data),
    refetchOnWindowFocus: false,
    enabled: !!codigoAgencia && !!data
  });
}
