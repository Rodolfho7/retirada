import { Controller, useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { FormsModel } from "../../models/retirada.model";
import * as Popover from '@radix-ui/react-popover';
import * as Select from '@radix-ui/react-select';
import styles from './data-hora-devolucao.module.css';
import { DayPicker } from "react-day-picker";
import IconCalendar from "../icons/calendar/calendar";
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import queryHorariosAgencias from "../../queries/queryHorariosAgencia";
import { Loading } from "../icons/loading/loading";
import IconArrowDown from "../icons/arrow-down/arrow-down";
import queryFeriados from "../../queries/queryFeriados";

function DataHoraDevolucao() {
  const [dataDevolucao, setDataDevolucao] = useState('');
  const [dataExibicao, setDataExibicao] = useState('');
  const [diasFeriados, setDiasFeriados] = useState<Date[]>([new Date(2023, 11, 11)]);
  const [diaSelecionadoCalendario, setDiaSelecionadoCalendario] = useState<Date>();
  const { watch, control } = useFormContext<FormsModel>();
  const agenciaDevolucao = watch('agenciaDevolucao');

  const { data: feriados } = queryFeriados(agenciaDevolucao);
  const { data: horarios, isFetching: loadingHorarios } = queryHorariosAgencias(agenciaDevolucao, dataDevolucao);

  useEffect(() => {
    if(feriados !== undefined) {
      setDiasFeriados((old) => [...old, ...feriados]);
    }
  }, [feriados]);

  const handleDataSelecionada = (data: Date | undefined, field: any) => {
    setDiaSelecionadoCalendario(data);
    const dataFormatada = format(data as Date, 'yyyy-MM-dd');
    setDataDevolucao(dataFormatada);
    field.onChange(dataFormatada);
    setDataExibicao(format(data as Date, 'dd/MM/yyyy'));
  }

  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
        <label htmlFor="dataDevolucao">Data Devolucao</label>
        <Controller
          name="dataDevolucao"
          control={control}
          render={({ field: { ref, ...field }, fieldState }) =>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <Popover.Root>
                <Popover.Trigger asChild>
                  <div className={styles['trigger']}>
                    <input type="text" className={styles['input']} placeholder={dataExibicao} />
                    <IconCalendar />
                  </div>
                </Popover.Trigger>
                <Popover.Portal>
                  <Popover.Content align="end" className={styles['popover-content']}>
                    <DayPicker
                      mode="single"
                      fromDate={new Date()}
                      selected={diaSelecionadoCalendario}
                      modifiers={{ feriados: diasFeriados }}
                      modifiersStyles={{ feriados: { background: '#dadada' }}}
                      {...field}
                      onSelect={(data) => handleDataSelecionada(data, field)}
                    />
                  </Popover.Content>
                </Popover.Portal>
              </Popover.Root>
              {fieldState.invalid && <span style={{ color: '#ff0000' }}>Campo obrigatorio</span>}
            </div>
          }
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
        <label htmlFor="horaDevolucao">Hora Devolucao</label>
        <Controller
          name="horaDevolucao"
          control={control}
          render={({ field: { ref, ...field }, fieldState }) =>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <Select.Root {...field} onValueChange={field.onChange}>
                <Select.Trigger className={styles['select-trigger']}>
                  <Select.Value placeholder='Selecione' />
                  <Select.Icon className={styles['select-icon']}>
                    {loadingHorarios && <Loading />}
                    <IconArrowDown />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content position="popper" sticky="always" className={styles['select-content']}>
                    <input type="text" className={styles['input-search']} onChange={() => { }} placeholder="pesquisar..." />
                    {horarios?.map((horario) =>
                      <Select.Item value={horario.value} key={horario.value} className={styles['select-item']}>
                        <Select.ItemText>
                          {horario.label}
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
      </div>
    </div>
  )
}

export default DataHoraDevolucao;
