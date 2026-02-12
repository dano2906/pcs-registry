<script lang="ts" setup>
import { email, minLength, object, pipe, string } from 'valibot'
import { z } from 'zod'
import { useForm } from '~/registry/form/useForm'

const userSchemaZod = z.object({
  username: z.string().min(3, 'Mínimo 3 caracteres'),
  email: z.email('Email inválido').min(3, 'Mínimo 3 caracteres'),
})

const userSchemaValibot = object({
  username: pipe(string('Debe introducir un string'), minLength(3, 'Mínimo 3 caracteres')),
  email: pipe(string('Debe introducir un string'), email('Debe introducir un email válido'), minLength(3, 'Mínimo 3 caracteres')),
})

const {
  name,
  fields,
  errors,
  isValid,
  isSubmitting,
  handleSubmit,
} = useForm(userSchemaZod, {
  name: 'zod-form-example',
  initialValues: { username: 'ZodForm' },
  validateOn: 'change',
  validateOnMount: false,
  onSubmit: async (data) => {
    console.warn('⏳ Iniciando envío de datos desde Zod...', data)
    await new Promise(resolve => setTimeout(resolve, 2000))
  },
})

const {
  name: v_name,
  fields: v_fields,
  errors: v_errors,
  isValid: v_isValid,
  isSubmitting: v_isSubmitting,
  handleSubmit: v_handleSubmit,
} = useForm(userSchemaValibot, {
  name: 'valibot-form-example',
  initialValues: { username: 'ValibotForm' },
  validateOn: 'submit',
  validateOnMount: false,
  onSubmit: async (data) => {
    console.warn('⏳ Iniciando envío de datos desde Valibot...', data)
    await new Promise(resolve => setTimeout(resolve, 2000))
  },
})
</script>

<template>
  <PartialsSection id="#form-manager" component-name="form" description="Composable para manejar formulario" title="Form" :registry-dependencies="[]">
    <template #example>
      <div class="flex flex-row items-center justify-start gap-12">
        <form class="space-y-2" @submit="handleSubmit">
          <h2>{{ name }}</h2>
          <div class="space-y-1">
            <Label class="flex flex-col items-start justify-center">
              Username
              <Input v-model="fields.username" />
            </Label>
            <span v-if="errors.username" class="text-xs" :class="[errors.username && 'text-destructive']">{{ errors.username }}</span>
          </div>
          <div class="space-y-1">
            <Label class="flex flex-col items-start justify-center">
              Email
              <Input v-model="fields.email" type="email" />
            </Label>
            <span v-if="errors.email" class="text-xs" :class="[errors.email && 'text-destructive']">{{ errors.email }}</span>
          </div>

          <Button :disabled="!isValid || isSubmitting">
            <LoadingSwap :is-loading="isSubmitting">
              Submit Z
            </LoadingSwap>
          </Button>
        </form>
        <form class="space-y-2" @submit="v_handleSubmit">
          <h2>{{ v_name }}</h2>
          <div class="space-y-1">
            <Label class="flex flex-col items-start justify-center">
              Username
              <Input v-model="v_fields.username" />
            </Label>
            <span v-if="v_errors.username" class="text-xs" :class="[v_errors.username && 'text-destructive']">{{ v_errors.username }}</span>
          </div>
          <div class="space-y-1">
            <Label class="flex flex-col items-start justify-center">
              Email
              <Input v-model="v_fields.email" type="email" />
            </Label>
            <span v-if="v_errors.email" class="text-xs" :class="[v_errors.email && 'text-destructive']">{{ v_errors.email }}</span>
          </div>

          <Button :disabled="!v_isValid || v_isSubmitting">
            <LoadingSwap :is-loading="v_isSubmitting">
              Submit V
            </LoadingSwap>
          </Button>
        </form>
      </div>
    </template>
  </PartialsSection>
</template>
