import { Controller, useFormContext } from "react-hook-form";
import { FormsModel } from "../../models/retirada.model";
import * as Select from '@radix-ui/react-select';
import { Loading } from "../icons/loading/loading";
import IconArrowDown from "../icons/arrow-down/arrow-down";
import queryLinhasAereas from "../../queries/queryLinhasAereas";
import styles from './linha-aerea.module.css';

function LinhaAerea() {
  const { watch, control, register, formState: { errors } } = useFormContext<FormsModel>();
  const codigoPaisSelecionado = watch('pais');
  const { data: linhasAereas, isFetching: loadingLinhasAereas } = queryLinhasAereas(codigoPaisSelecionado);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
        <label htmlFor="linhaAerea">Linha Aerea</label>
        <Controller
          name="linhaAerea"
          control={control}
          render={({ field: { ref, ...field }, fieldState }) =>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <Select.Root {...field} onValueChange={field.onChange}>
                <Select.Trigger className={styles['trigger']}>
                  <Select.Value placeholder='Selecione' />
                  <Select.Icon className={styles['select-icon']}>
                    {loadingLinhasAereas && <Loading />}
                    <IconArrowDown />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content position="popper" sticky="always" className={styles['select-content']}>
                    <input type="text" className={styles['input-search']} onChange={() => { }} placeholder="pesquisar..." />
                    {linhasAereas?.map((linhaAerea) =>
                      <Select.Item value={linhaAerea.value} key={linhaAerea.value} className={styles['select-item']}>
                        <Select.ItemText>
                          {linhaAerea.label}
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
        <label htmlFor="linhaAerea">Linha Aerea</label>
        <input type="text" {...register('numeroVoo')} className={styles['trigger']} />
        {errors?.linhaAerea && <span style={{ color: '#ff0000' }}>Campo obrigatorio</span>}
      </div>
    </div>
  )
}

export default LinhaAerea;
