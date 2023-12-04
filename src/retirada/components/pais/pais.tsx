import { useFormContext, Controller } from "react-hook-form";
import * as Select from '@radix-ui/react-select';
import { FormsModel } from "../../models/retirada.model";
import styles from './pais.module.css';
import { Loading } from "../icons/loading/loading";
import queryPaises from "../../queries/queryPaises";
import IconArrowDown from "../icons/arrow-down/arrow-down";
import { ChangeEvent, useEffect, useState } from "react";

function Pais() {
  const { setValue, control } = useFormContext<FormsModel>();
  const { data: paises, isFetching: loadingPaises, error, isError } = queryPaises();

  const [filtro, setFiltro] = useState('');
  const [paisesFiltrado, setPaisesFiltrados] = useState<any[] | undefined>([]);

  useEffect(() => {
    setPaisesFiltrados(paises);
  }, [paises])

  const handlePaisSelecionado = (value: string, onChange: any) => {
    onChange(value);
    setValue('agenciaRetirada', '');
    setValue('agenciaDevolucao', '');
    setValue('dataRetirada', '');
    setValue('horaRetirada', '');
    setValue('linhaAerea', '');
  }

  const handleFiltroPaises = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const texto = event.target.value;
    setFiltro(texto);
    setPaisesFiltrados(paises?.filter((pais) => pais.label.includes(texto)));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <label htmlFor="pais">Pais</label>
      <Controller
        name="pais"
        control={control}
        render={({ field: { ref, ...field }, fieldState }) =>
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Select.Root {...field} onValueChange={(e: string) => handlePaisSelecionado(e, field.onChange)}>
              <Select.Trigger className={styles['trigger']}>
                <Select.Value placeholder='Selecione' />
                <Select.Icon className={styles['select-icon']}>
                  {loadingPaises && <Loading />}
                  <IconArrowDown />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content position="popper" sticky="always" className={styles['select-content']}>
                  <input type="text" className={styles['input-search']} value={filtro} onChange={handleFiltroPaises} placeholder="pesquisar..." />
                  {paisesFiltrado?.map((pais) =>
                    <Select.Item value={pais.value} key={pais.value} className={styles['select-item']}>
                      <Select.ItemText>
                        {pais.label}
                      </Select.ItemText>
                    </Select.Item>
                  )}
                </Select.Content>
              </Select.Portal>
            </Select.Root>
            {fieldState.invalid && <span style={{ color: '#ff0000' }}>Campo obrigatorio</span>}
          </div>
        }
      />
      {isError && <span>{error.message}</span>}
    </div>
  )
};

export default Pais;
