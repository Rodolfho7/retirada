import { useQuery } from "@tanstack/react-query";
import { Retirada } from "../services/retirada.service";

export default function queryAgencias(codigoPais: string) {
  return useQuery({
    queryKey: ['agencias', codigoPais],
    queryFn: () => Retirada.getAgencias(codigoPais),
    refetchOnWindowFocus: false,
    enabled: !!codigoPais
  });
}
