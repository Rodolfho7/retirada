import { useQuery } from "@tanstack/react-query";
import { Retirada } from "../services/retirada.service";

export default function queryPaises() {
  return useQuery({
    queryKey: ['pais'],
    queryFn: Retirada.getPaises,
    refetchOnWindowFocus: false,
  });
}
