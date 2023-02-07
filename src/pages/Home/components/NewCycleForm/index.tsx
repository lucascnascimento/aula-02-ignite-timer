import { FormContainer, MinutesAmountInput, TaskInput } from './styles'
import { MINUTES_AMOUNT, TASK } from '../../../../utils/constants'
import { useContext } from 'react'
import { CyclesContext } from '../..'
import { useFormContext } from 'react-hook-form'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor={TASK}>Vou trabalhar em</label>
      <TaskInput
        id={TASK}
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle}
        {...register(TASK)}
      />
      <datalist id="task-suggestions">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
        <option value="Projeto 4" />
      </datalist>

      <label htmlFor={MINUTES_AMOUNT}>durante</label>
      <MinutesAmountInput
        type="number"
        id={MINUTES_AMOUNT}
        placeholder="00"
        step={5}
        min={5}
        max={60}
        disabled={!!activeCycle}
        {...register(MINUTES_AMOUNT, { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}
