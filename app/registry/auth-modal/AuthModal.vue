<script setup lang="ts">
import { Mail, User, X } from 'lucide-vue-next'
import { AnimatePresence, motion } from 'motion-v'
import { email, minLength, object, optional, pipe, string } from 'valibot'
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { cn } from '@/lib/utils'
import { useForm } from '../form-builder/useForm'
import InputPassword from '../input-password/InputPassword.vue'
import LoadingSwap from '../loading-swap/LoadingSwap.vue'

interface Props {
  options?: {
    triggerText?: string
    titleLogin?: string
    subtitleLogin?: string
    titleRegister?: string
    subtitleRegister?: string
    loginSpan?: string
    registerSpan?: string
    nameLabel?: string
    namePlaceholder?: string
    emailLabel?: string
    emailPlaceholder?: string
    passwordLabel?: string
    passwordPlaceholder?: string
    submitLogin?: string
    submitRegister?: string
    socialAuthPrefix?: string
    loginLink?: {
      account?: string
      link?: string
    }
    registerLink?: {
      account?: string
      link?: string
    }
    className?: string
  }
  socials?: {
    label: string
    id: string
  }[]
}

const { options = {
  triggerText: 'Sign in / Sign up',
  className: '',
  titleLogin: 'Welcome back',
  titleRegister: 'Create an account',
  subtitleLogin: 'Sign in to your account to continue',
  subtitleRegister: 'Enter your details to get started',
  loginSpan: 'Or sign in with email/password',
  registerSpan: '',
  nameLabel: 'Name',
  namePlaceholder: 'John Doe',
  emailLabel: 'Email',
  emailPlaceholder: 'name@example.com',
  passwordLabel: 'Password',
  passwordPlaceholder: '••••••••',
  submitLogin: 'Sign in',
  submitRegister: 'Sign up',
  socialAuthPrefix: 'Sign in with',
  loginLink: {
    account: 'Don\'t have an account?',
    link: 'Sign up',
  },
  registerLink: {
    account: 'Already have an account?',
    link: 'Sign in',
  },
}, socials = [
  { id: 'google', label: 'Google' },
  { id: 'apple', label: 'Apple' },
  { id: 'microsoft', label: 'Microsoft' },
  { id: 'github', label: 'Github' },
  { id: 'twitter', label: 'Twitter' },
] } = defineProps<Props>()

const emit = defineEmits<{
  (e: 'loginProvider', provider: string): void
  (e: 'submit', form: any): void
}>()

const isOpen = ref(false)
const view = ref<'login' | 'register'>('login')

const schema = object({
  name: optional(string('Must be a string')),
  email: pipe(string('Must be a string'), email('Must be a valid email')),
  password: pipe(string('Must be a string'), minLength(8)),
})

const { fields, isSubmitting, errors, handleSubmit, reset } = useForm(schema, {
  name: 'auth-form',
  initialValues: {
    email: '',
    password: '',
    name: '',
  },
  mode: 'change',
  onSubmit: async (data) => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    emit('submit', data)
  },
})

function handleClose() {
  isOpen.value = false
  setTimeout(() => {
    view.value = 'login'
    reset()
  }, 200)
}

function toggleView() {
  view.value = view.value === 'login' ? 'register' : 'login'
}
</script>

<template>
  <div>
    <Button
      :class="cn('rounded-full px-8 text-sm font-medium', options.className)"
      @click="isOpen = true"
    >
      {{ options.triggerText }}
    </Button>

    <AnimatePresence>
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0 not-prose">
        <motion.div
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
          class="absolute inset-0 bg-zinc-950/20 backdrop-blur-sm dark:bg-zinc-950/40"
          @click="handleClose"
        />

        <motion.div
          :variants="{
            hidden: { opacity: 0, scale: 0.95 },
            show: {
              opacity: 1,
              scale: 1,
              transition: {
                type: 'spring',
                bounce: 0.3,
                duration: 0.4,
                staggerChildren: 0.05,
              },
            },
            exit: {
              opacity: 0,
              scale: 0.95,
              transition: {
                type: 'spring',
                bounce: 0,
                duration: 0.2,
              },
            },
          }"
          initial="hidden"
          animate="show"
          exit="exit"
          class="relative w-full max-w-[360px] overflow-hidden rounded-3xl p-6 shadow-2xl bg-muted/80"
        >
          <div class="absolute right-4 top-4">
            <Button
              size="icon-sm"
              variant="ghost"
              class="rounded-full text-muted-foreground"
              @click="handleClose"
            >
              <X class="h-4 w-4" />
            </Button>
          </div>

          <motion.div
            :variants="{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }" class=" text-center mt-2 mb-6"
          >
            <h2 class="text-2xl font-semibold tracking-tight text-foreground">
              {{ view === 'login' ? options.titleLogin : options.titleRegister }}
            </h2>
            <p class="mt-2 text-sm text-muted-foreground">
              {{ view === 'login' ? options.subtitleLogin : options.subtitleRegister }}
            </p>
          </motion.div>

          <motion.div
            :variants="{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }" class="grid grid-cols-5 gap-3 mb-6"
          >
            <Button
              v-for="btn in socials"
              :key="btn.id"
              size="icon-lg"
              variant="ghost"
              :class="cn(
                'flex aspect-square items-center justify-center rounded-2xl hover:scale-115 hover:bg-accent/50 transition-all',
              )"
              :aria-label="`${options.socialAuthPrefix} ${btn.id}`"
              @click="emit('loginProvider', btn.id)"
            >
              <svg v-if="btn.id === 'google'" viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <svg v-else-if="btn.id === 'microsoft'" viewBox="0 0 88 88" class="h-5 w-5">
                <path fill="#f35325" d="M0 0h42v42H0z" /><path fill="#81bc06" d="M46 0h42v42H46z" /><path fill="#05a6f0" d="M0 46h42v42H0z" /><path fill="#ffba08" d="M46 46h42v42H46z" />
              </svg>
              <svg v-else-if="btn.id === 'apple'" viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
              </svg>
              <svg v-else-if="btn.id === 'twitter'" viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" fill="#1DA1F2" />
              </svg>
              <svg v-else-if="btn.id === 'github'" viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </Button>
          </motion.div>

          <motion.div
            :variants="{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }" class="relative mb-8"
          >
            <div class="absolute inset-0 flex items-center">
              <span class="w-full border-t border-muted-foreground/20" />
            </div>
            <div class="relative flex justify-center text-xs uppercase">
              <span class="px-2 text-accent bg-muted-foreground rounded-md">
                {{ view === 'login' ? options.loginSpan : options.registerSpan }}
              </span>
            </div>
          </motion.div>

          <motion.form
            :variants="{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }" class="space-y-4" @submit.prevent="handleSubmit"
          >
            <Field v-if="view === 'register'">
              <FieldLabel for="name" class="sr-only">
                {{ options.nameLabel }}
              </FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="name" v-model="fields.name"
                  :placeholder="options.namePlaceholder"
                  type="text"
                />
                <InputGroupAddon>
                  <User class="size-4" />
                </InputGroupAddon>
              </InputGroup>
              <FieldError v-if="errors.name" class="text-destructive text-xs">
                {{ errors.name }}
              </FieldError>
            </Field>
            <Field>
              <FieldLabel for="email" class="sr-only">
                {{ options.emailLabel }}
              </FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="email"
                  v-model="fields.email"
                  type="email"
                  :placeholder="options.emailPlaceholder"
                />
                <InputGroupAddon>
                  <Mail class="size-4" />
                </InputGroupAddon>
              </InputGroup>
              <FieldError v-if="errors.email" class="text-destructive text-xs">
                {{ errors.email }}
              </FieldError>
            </Field>
            <Field>
              <FieldLabel for="password" class="sr-only">
                {{ options.passwordLabel }}
              </FieldLabel>
              <InputPassword v-model="fields.password" :placeholder="options.passwordPlaceholder" />
              <FieldError v-if="errors.password" class="text-destructive text-xs">
                {{ errors.password }}
              </FieldError>
            </Field>

            <Button type="submit" variant="default" class="w-full" :disabled="isSubmitting">
              <LoadingSwap :is-loading="isSubmitting">
                {{ view === 'login' ? options.submitLogin : options.submitRegister }}
              </LoadingSwap>
            </Button>
          </motion.form>

          <motion.div
            :variants="{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }" class="mt-6 text-center text-sm"
          >
            <span class="text-foreground/70">
              {{ view === 'login' ? options?.loginLink?.account : options?.registerLink?.account }}
            </span>
            <Button
              variant="link"
              type="button"
              class="px-0 ml-1 font-medium text-foreground underline-offset-4 hover:underline"
              @click="toggleView"
            >
              {{ view === 'login' ? options?.loginLink?.link : options?.registerLink?.link }}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  </div>
</template>
