import { Controller, useFormContext } from "react-hook-form";
import * as Select from '@radix-ui/react-select';
import styles from './agencias.module.css';
import { FormsModel } from "../../models/retirada.model";
import { Loading } from "../icons/loading/loading";
import queryAgencias from "../../queries/queryAgencias";
import IconArrowDown from "../icons/arrow-down/arrow-down";

function Agencias() {
  const { watch, control, setValue } = useFormContext<FormsModel>();
  const codigoPaisSelecionado = watch('pais');
  const { data: agencias, isFetching: loadingAgencias } = queryAgencias(codigoPaisSelecionado);
  const agenciaDevolucao = watch('agenciaDevolucao');

  const handleRetiradaSelecionado = (value: string, onChange: any) => {
    onChange(value);
    if (!agenciaDevolucao) {
      setValue('agenciaDevolucao', value);
    }
  }

  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
        <label htmlFor="agenciaRetirada">agenciaRetirada</label>
        <Controller
          name="agenciaRetirada"
          control={control}
          render={({ field: { ref, ...field }, fieldState }) =>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <Select.Root {...field} onValueChange={(e: string) => handleRetiradaSelecionado(e, field.onChange)}>
                <Select.Trigger className={styles['trigger']}>
                  <Select.Value placeholder='Selecione' />
                  <Select.Icon className={styles['select-icon']}>
                    {loadingAgencias && <Loading />}
                    <IconArrowDown />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content position="popper" sticky="always" className={styles['select-content']}>
                    <input type="text" className={styles['input-search']} onChange={() => { }} placeholder="pesquisar..." />
                    {agencias?.map((agencia) =>
                      <Select.Item value={agencia.value} key={agencia.value} className={styles['select-item']}>
                        <Select.ItemText>
                          {agencia.label}
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

      <div style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
        <label htmlFor="agenciaDevolucao">agenciaDevolucao</label>
        <Controller
          name="agenciaDevolucao"
          control={control}
          render={({ field: { ref, ...field }, fieldState }) =>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <Select.Root {...field} onValueChange={field.onChange}>
                <Select.Trigger className={styles['trigger']}>
                  <Select.Value placeholder='Selecione' />
                  <Select.Icon className={styles['select-icon']}>
                    {loadingAgencias && <Loading />}
                    <IconArrowDown />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content position="popper" sticky="always" className={styles['select-content']}>
                    <input type="text" className={styles['input-search']} onChange={() => { }} placeholder="pesquisar..." />
                    {agencias?.map((agencia) =>
                      <Select.Item value={agencia.value} key={agencia.value} className={styles['select-item']}>
                        <Select.ItemText>
                          {agencia.label}
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

export default Agencias;
