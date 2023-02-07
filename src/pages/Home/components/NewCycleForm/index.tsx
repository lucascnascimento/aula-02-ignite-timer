import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { FormContainer, MinutesAmountInput, TaskInput } from './styles'
import { MINUTES_AMOUNT, TASK } from '../../../../utils/constants'

const newCycleFormValidationSchema = zod.object({
  [TASK]: zod.string().min(1, 'Informe a tarefa'),
  [MINUTES_AMOUNT]: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 60 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function NewCycleForm() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })
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
