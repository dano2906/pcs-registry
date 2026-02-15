<script lang="ts" setup>
import { type } from 'arktype'
import { email, minLength, object, pipe, string } from 'valibot'
import { z } from 'zod'
import { useForm } from '~/registry/form/useForm'

const userSchemaZod = z.object({
  username: z.string().min(3, 'Mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
})

const userSchemaValibot = object({
  username: pipe(string(), minLength(3, 'Mínimo 3 caracteres')),
  email: pipe(string(), email('Email válido'), minLength(3, 'Mínimo 3 caracteres')),
})

const userSchemaArktype = type({
  username: 'string >= 3',
  email: 'string > 3',
})

const formZod = useForm(userSchemaZod, {
  name: 'Zod Form',
  initialValues: { username: 'ZodUser', email: '' },
  mode: 'change',
  onSubmit: async (data) => {
    console.warn('Zod Data:', data)
    await new Promise(r => setTimeout(r, 2000))
  },
})

const formVali = useForm(userSchemaValibot, {
  name: 'Valibot Form',
  initialValues: { username: 'ValiUser', email: '' },
  mode: 'blur',
  onSubmit: async (data) => {
    console.warn('Valibot Data:', data)
    await new Promise(r => setTimeout(r, 2000))
  },
})

const formArk = useForm(userSchemaArktype, {
  name: 'Arktype Form',
  initialValues: { username: '', email: '' },
  mode: 'submit',
  onSubmit: async (data) => {
    console.warn('Arktype Data:', data)
    await new Promise(r => setTimeout(r, 2000))
  },
})
</script>

<template>
  <PartialsSection id="#form-manager" component-name="useForm" description="Composable para manejar formularios" title="useForm" :registry-dependencies="[]">
    <template #example>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <form class="space-y-4" @submit="formZod.handleSubmit">
          <h2 class="font-bold border-b pb-2">
            {{ formZod.name }}
          </h2>

          <div class="space-y-1">
            <Label>Username</Label>
            <Input v-model="formZod.fields.value.username" @blur="formZod.setFieldTouched('username')" />
            <p v-if="formZod.touched.value.username && formZod.errors.value.username" class="text-xs text-destructive">
              {{ formZod.errors.value.username }}
            </p>
          </div>

          <div class="space-y-1">
            <Label>Email</Label>
            <Input v-model="formZod.fields.value.email" @blur="formZod.setFieldTouched('email')" />
            <p v-if="formZod.touched.value.email && formZod.errors.value.email" class="text-xs text-destructive">
              {{ formZod.errors.value.email }}
            </p>
          </div>

          <Button type="submit" :disabled="formZod.isSubmitting.value" class="w-full">
            <LoadingSwap :is-loading="formZod.isSubmitting.value">
              Submit Zod
            </LoadingSwap>
          </Button>
        </form>

        <form class="space-y-4" @submit="formVali.handleSubmit">
          <h2 class="font-bold border-b pb-2">
            {{ formVali.name }}
          </h2>

          <div class="space-y-1">
            <Label>Username</Label>
            <Input v-model="formVali.fields.value.username" @blur="formVali.setFieldTouched('username')" />
            <p v-if="formVali.touched.value.username && formVali.errors.value.username" class="text-xs text-destructive">
              {{ formVali.errors.value.username }}
            </p>
          </div>

          <div class="space-y-1">
            <Label>Email</Label>
            <Input v-model="formVali.fields.value.email" @blur="formVali.setFieldTouched('email')" />
            <p v-if="formVali.touched.value.email && formVali.errors.value.email" class="text-xs text-destructive">
              {{ formVali.errors.value.email }}
            </p>
          </div>

          <Button type="submit" variant="outline" :disabled="formVali.isSubmitting.value" class="w-full">
            <LoadingSwap :is-loading="formVali.isSubmitting.value">
              Submit Valibot
            </LoadingSwap>
          </Button>
        </form>

        <form class="space-y-4" @submit="formArk.handleSubmit">
          <h2 class="font-bold border-b pb-2">
            {{ formArk.name }}
          </h2>

          <div class="space-y-1">
            <Label>Username</Label>
            <Input v-model="formArk.fields.value.username" @blur="formArk.setFieldTouched('username')" />
            <p v-if="formArk.touched.value.username && formArk.errors.value.username" class="text-xs text-destructive">
              {{ formArk.errors.value.username }}
            </p>
          </div>

          <div class="space-y-1">
            <Label>Email</Label>
            <Input v-model="formArk.fields.value.email" @blur="formArk.setFieldTouched('email')" />
            <p v-if="formArk.touched.value.email && formArk.errors.value.email" class="text-xs text-destructive">
              {{ formArk.errors.value.email }}
            </p>
          </div>

          <Button type="submit" variant="secondary" :disabled="formArk.isSubmitting.value" class="w-full">
            <LoadingSwap :is-loading="formArk.isSubmitting.value">
              Submit Arktype
            </LoadingSwap>
          </Button>
        </form>
      </div>
    </template>
  </PartialsSection>
</template>
