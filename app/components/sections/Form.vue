<script lang="ts" setup>
import { z } from 'zod'
import { useForm } from '~/registry/form/useForm'

const userSchema = z.object({
  username: z.string().min(3, 'Mínimo 3 caracteres'),
  email: z.email('Email inválido'),
})

const {
  errors,
  validate,
  defineField,
  isValid,
  isDirty,
} = useForm(userSchema, {
  initialValues: { username: '', email: '' },
  validateOn: 'change',
})

const username = defineField('username')
const email = defineField('email')

async function handleSubmit() {
  const result = await validate()
  if (result.success) {
    console.warn('Datos listos para enviar:', result.data)
  }
  else {
    console.error('Errores detectados:', result.errors)
  }
}
</script>

<template>
  <PartialsSection id="#form-manager" component-name="form" description="Composable para manejar formulario" title="Form" :registry-dependencies="[]">
    <template #example>
      <div class="flex flex-col flex-wrap items-start justify-start gap-2">
        <form @submit.prevent="handleSubmit">
          <div>
            <label>Usuario:</label>
            <input v-model="username" type="text" :class="{ error: errors.username }">
            <span v-if="errors.username">{{ errors.username }}</span>
          </div>

          <div>
            <label>Email:</label>
            <input v-model="email" type="email" :class="{ error: errors.email }">
            <span v-if="errors.email">{{ errors.email }}</span>
          </div>

          <hr>

          <p>Estado del form: {{ isDirty ? 'Modificado' : 'Limpio' }}</p>
          <p>¿Es válido?: {{ isValid ? '✅ Sí' : '❌ No' }}</p>

          <button type="submit" :disabled="!isValid">
            Enviar
          </button>
        </form>
      </div>
    </template>
  </PartialsSection>
</template>

<style scoped>
.error { border: 1px solid red; }
span { color: red; font-size: 0.8rem; }
</style>
