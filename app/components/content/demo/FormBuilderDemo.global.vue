<script setup lang="ts">
import type { Field } from '~/registry/form-builder/types'
import { boolean, email, maxValue, minLength, minValue, number, object, pipe, string } from 'valibot'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import FormBuilder from '@/registry/form-builder/FormBuilder.vue'
import { useForm } from '@/registry/form-builder/useForm'

const schema = object({
  name: pipe(string(), minLength(3, 'Minimum 3 characters')),
  email: pipe(string(), email('Invalid email')),
  age: pipe(number(), minValue(18, 'Must be at least 18'), maxValue(99, 'Too old')),
  newsletter: boolean(),
  role: string(),
  bio: string(),
  customField: string(),
})

const formV = useForm(schema, {
  initialValues: {
    name: '',
    email: '',
    age: 25,
    newsletter: true,
    role: 'client',
    bio: '',
    customField: '',
  },
  onSubmit: async (data) => {
    console.warn('Form data:', data)
  },
})

const fields: Field[] = [
  {
    type: 'fieldset',
    name: 'user_info',
    label: 'User Information',
    orientation: 'vertical',
    wrapperClass: 'grid grid-cols-1 md:grid-cols-2 gap-4 col-span-full',
    fields: [
      { name: 'name', type: 'text', label: 'Full Name', placeholder: 'John Doe', orientation: 'vertical' },
      { name: 'email', type: 'email', label: 'Email', placeholder: 'john@example.com', orientation: 'vertical' },
    ],
  },
  { name: 'age', type: 'number-field', label: 'Age', min: 1, max: 120, orientation: 'vertical' },
  {
    name: 'role',
    type: 'select',
    label: 'Account Role',
    options: ['client', 'admin', 'moderator'],
    placeholder: 'Select a role',
    orientation: 'vertical',
  },
  { name: 'bio', type: 'textarea', label: 'Biography', placeholder: 'Tell us about yourself...', orientation: 'vertical', wrapperClass: 'col-span-full' },
  { name: 'customField', type: 'custom', label: 'Custom Slot', slotName: 'custom-slot', orientation: 'vertical' },
  { name: 'newsletter', type: 'switch', label: 'Subscribe to newsletter', orientation: 'horizontal' },
]
</script>

<template>
  <div class="p-8 bg-muted/20 rounded-lg border">
    <FormBuilder :form="formV" :fields="fields" form-class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
      <template #custom-slot="{ field, form }">
        <div class="border p-4 rounded-lg bg-muted/50 border-dashed border-primary/50">
          <Label :for="field.name" class="text-xs font-bold uppercase text-primary mb-2 block">{{ field.label }}</Label>
          <Input
            :id="field.name"
            :name="field.name"
            class="w-full bg-transparent outline-none border-b border-primary/20 focus:border-primary transition-colors pb-1"
            :value="form.fields.value[field.name]"
            placeholder="Type here..."
            @input="(e: Event) => form.setFieldValue(field.name, (e.target as HTMLInputElement).value)"
          />
        </div>
      </template>
      <template #actions>
        <Button variant="secondary" @click="formV.reset()">
          Reset
        </Button>
      </template>
    </FormBuilder>
  </div>
</template>
