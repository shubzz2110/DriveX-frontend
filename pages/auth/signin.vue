<template>
  <div class="flex flex-col w-full h-full mt-7">
    <div class="flex flex-col items-center space-y-1.5">
      <h1 class="text-surface-900 font-bold text-2xl leading-full">
        Sign in to your account.
      </h1>
      <p class="text-surface-700 font-normal text-sm leading-[150%]">
        Enter your credentials to login
      </p>
    </div>
    <form
      @submit.prevent="handleLoginUser"
      class="flex flex-col w-full h-max space-y-5 mt-10"
    >
      <div class="flex flex-col space-y-1.5">
        <label for="id-login-email" class="form-label">Email Address: </label>
        <IconField>
          <InputIcon class="pi pi-envelope" />
          <InputText
            id="id-login-email"
            v-model="email"
            placeholder="Enter your email"
            :disabled="isLoading"
          />
        </IconField>
        <span v-if="errors['email']" class="text-error">{{
          errors["email"]
        }}</span>
      </div>
      <div class="flex flex-col space-y-1.5">
        <label for="id-login-password" class="form-label">Password: </label>
        <IconField>
          <InputIcon class="pi pi-lock" />
          <Password
            id="id-login-password"
            v-model="password"
            :toggle-mask="true"
            placeholder="Enter your password"
            :feedback="false"
            :disabled="isLoading"
          >
          </Password>
        </IconField>
        <span v-if="errors['password']" class="text-error">{{
          errors["password"]
        }}</span>
      </div>
      <div class="flex items-center justify-end w-full">
        <NuxtLink
          to="/auth/forgot-password"
          class="text-brand font-semibold text-sm leading-5 underline"
        >
          Forgot password?</NuxtLink
        >
      </div>
      <div class="w-full h-max">
        <Button
          :loading="isLoading"
          type="submit"
          severity="brand"
          label="Login"
        />
      </div>
    </form>
    <p
      class="text-sm text-surface-800 font-semibold leading-full text-center mt-5"
    >
      Don't have an account?
      <NuxtLink to="/auth/signup" class="text-brand font-semibold underline"
        >Signup now!</NuxtLink
      >
    </p>
  </div>
</template>

<script setup lang="ts">
import * as yup from "yup";
definePageMeta({
  layout: "auth",
});
const email = ref<string>("");
const password = ref<string>("");
const errors = ref<any>({});
const isLoading = ref<boolean>(false);

const formSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const validateField = async (field: any) => {
  try {
    await formSchema.validateAt(field, {
      email: email.value,
      password: password.value,
    });
    delete errors.value[field];
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      errors.value[field] = error.message;
    }
  }
};

const validateForm = async () => {
  try {
    await formSchema.validate(
      {
        email: email.value,
        password: password.value,
      },
      { abortEarly: false }
    );
    errors.value = {};
    return true;
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      err.inner.forEach((error: any) => {
        errors.value[error.path] = error.message;
      });
    }
    return false;
  }
};

const handleLoginUser = async () => {
  if (await validateForm()) {
    console.log("first");
  }
};

const fields = {
  email,
  password,
} as any;

Object.keys(fields).forEach((key) => {
  watch(fields[key], () => validateField(key));
});
</script>

<style scoped></style>
