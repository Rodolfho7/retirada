import { Controller, useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { FormsModel } from "../../models/retirada.model";
import * as Popover from '@radix-ui/react-popover';
import * as Select from '@radix-ui/react-select';
import styles from './data-hora-retirada.module.css';
import { DayPicker } from "react-day-picker";
import IconCalendar from "../icons/calendar/calendar";
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import queryHorariosAgencias from "../../queries/queryHorariosAgencia";
import { Loading } from "../icons/loading/loading";
import IconArrowDown from "../icons/arrow-down/arrow-down";
import queryFeriados from "../../queries/queryFeriados";

function DataHoraRetirada() {
  const [dataRetirada, setDataRetirada] = useState('');
  const [dataExibicao, setDataExibicao] = useState('');
  const [diasFeriados, setDiasFeriados] = useState<Date[]>([]);
  const [diaSelecionadoCalendario, setDiaSelecionadoCalendario] = useState<Date>();
  const { watch, control } = useFormContext<FormsModel>();
  const agenciaRetirada = watch('agenciaRetirada');

  const { data: feriados } = queryFeriados(agenciaRetirada);
  const { data: horarios, isFetching: loadingHorarios } = queryHorariosAgencias(agenciaRetirada, dataRetirada);

  useEffect(() => {
    if(feriados !== undefined) {
      setDiasFeriados(feriados);
    }
  }, [feriados]);

  const handleDataSelecionada = (data: Date | undefined, field: any) => {
    setDiaSelecionadoCalendario(data);
    const dataFormatada = format(data as Date, 'yyyy-MM-dd');
    setDataRetirada(dataFormatada);
    field.onChange(dataFormatada);
    setDataExibicao(format(data as Date, 'dd/MM/yyyy'));
  }

  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
        <label htmlFor="dataRetirada">Data Retirada</label>
        <Controller
          name="dataRetirada"
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
        <label htmlFor="horaRetirada">Hora Retirada</label>
        <Controller
          name="horaRetirada"
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

export default DataHoraRetirada;
