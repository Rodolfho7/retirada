import { useQuery } from "@tanstack/react-query";
import { Retirada } from "../services/retirada.service";

export default function queryLinhasAereas(codigoPais: string) {
  return useQuery({
    queryKey: ['pais', codigoPais],
    queryFn: () => Retirada.getLinhasAereas(codigoPais),
    refetchOnWindowFocus: false,
    enabled: !!codigoPais
  });
}
