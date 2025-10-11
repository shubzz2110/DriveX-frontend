<template>
  <div class="flex flex-col w-full h-full mt-7">
    <div class="flex flex-col items-center space-y-1">
      <h1 class="text-surface-900 font-bold text-2xl leading-full">
        Sign up with us
      </h1>
      <p class="text-surface-700 font-normal text-sm leading-[150%]">
        Please fill the below details to get started
      </p>
    </div>
    <form
      v-if="step === 1"
      @submit.prevent="handleStepOne"
      method="post"
      class="flex flex-col w-full h-max space-y-5 mt-10"
    >
      <div class="flex flex-col space-y-1.5">
        <label for="id-signup-fullname" class="form-label">Full Name: </label>
        <IconField>
          <InputIcon class="pi pi-envelope" />
          <InputText
            id="id-signup-fullname"
            v-model="fullName"
            placeholder="Enter full name"
            :disabled="isLoading"
          />
        </IconField>
        <span v-if="errors['fullName']" class="text-error">{{
          errors["fullName"]
        }}</span>
      </div>
      <div class="flex flex-col space-y-1.5">
        <label for="id-signup-email" class="form-label">Email Address: </label>
        <IconField>
          <InputIcon class="pi pi-envelope" />
          <InputText
            id="id-signup-email"
            v-model="email"
            placeholder="Enter your email"
            :disabled="isLoading"
          />
        </IconField>
        <span v-if="errors['email']" class="text-error">{{
          errors["email"]
        }}</span>
      </div>
      <div class="w-full h-max pt-5">
        <Button
          :loading="isLoading"
          type="submit"
          severity="brand"
          label="Next"
        />
      </div>
    </form>
    <form
      v-if="step === 2"
      method="post"
      @submit.prevent="handleSignUp"
      class="flex flex-col w-full h-max space-y-5 mt-10"
    >
      <Button
        @click="step = 1"
        rounded
        icon="pi pi-arrow-left"
        icon-class="leading-0"
        severity="secondary"
      />
      <div class="flex flex-col space-y-2.5">
        <label for="id-register-password" class="form-label">Password: </label>
        <IconField>
          <InputIcon class="pi pi-lock" />
          <Password
            id="id-register-password"
            v-model="password"
            :toggle-mask="true"
            placeholder="Create your password"
            :disabled="isLoading"
          >
            <template #header>
              <h6 class="text-surface-0 font-semibold text-sm pb-2.5">
                Pick a password
              </h6>
            </template>
            <template #footer>
              <Divider />
              <p class="mt-2.5 text-surface-800 font-semibold text-sm pb-2.5">
                Suggestions
              </p>
              <ul class="pl-2 ml-2 mt-0 list-disc" style="line-height: 1.5">
                <li class="text-sm font-normal text-surface-800">
                  At least one lowercase
                </li>
                <li class="text-sm font-normal text-surface-800">
                  At least one uppercase
                </li>
                <li class="text-sm font-normal text-surface-800">
                  At least one numeric
                </li>
                <li class="text-sm font-normal text-surface-800">
                  Minimum 8 characters
                </li>
              </ul>
            </template>
          </Password>
        </IconField>
        <span v-if="errors['password']" class="text-error">{{
          errors["password"]
        }}</span>
      </div>
      <div class="flex flex-col space-y-1.5">
        <label for="id-signup-password" class="form-label"
          >Confirm Password:
        </label>
        <IconField>
          <InputIcon class="pi pi-lock" />
          <Password
            id="id-signup-confirm-password"
            v-model="confirmPassword"
            :toggle-mask="true"
            placeholder="Re-enter password"
            :disabled="isLoading"
            :feedback="false"
          >
          </Password>
        </IconField>
        <span v-if="errors['confirmPassword']" class="text-error">{{
          errors["confirmPassword"]
        }}</span>
      </div>
      <div class="w-full h-max pt-5">
        <Button
          :loading="isLoading"
          type="submit"
          severity="brand"
          label="Sign Up"
        />
      </div>
    </form>
    <p
      className="pt-5 text-sm text-surface-800 font-semibold leading-full text-center"
    >
      Already have an account?
      <NuxtLink
        to="/auth/signin"
        className="text-brand hover:underline"
      >
        Sign in
      </NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { NuxtLink } from "#components";
import * as yup from "yup";
definePageMeta({
  layout: "auth",
});
const step = ref<1 | 2>(1);
const fullName = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");
const confirmPassword = ref<string>("");
const isLoading = ref<boolean>(false);
const errors = ref<any>({});

// Step 1 validation schema
const stepOneSchema = yup.object({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
});

// Step 2 validation schema
const stepTwoSchema = yup.object({
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const validateField = async (field: any) => {
  try {
    if (step.value === 1) {
      await stepOneSchema.validateAt(field, {
        fullName: fullName.value,
        email: email.value,
      });
      delete errors.value[field];
    }
    if (step.value === 2) {
      await stepTwoSchema.validateAt(field, {
        password: password.value,
        confirmPassword: confirmPassword.value,
      });
      delete errors.value[field];
    }
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      errors.value[field] = error.message;
    }
  }
};

const validateForm = async () => {
  try {
    if (step.value === 1) {
      await stepOneSchema.validate(
        {
          fullName: fullName.value,
          email: email.value,
        },
        { abortEarly: false }
      );
    }
    if (step.value === 2) {
      await stepTwoSchema.validate(
        {
          password: password.value,
          confirmPassword: confirmPassword.value,
        },
        { abortEarly: false }
      );
    }
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

const handleStepOne = async () => {
  if (await validateForm()) {
    step.value = 2;
  }
};

const handleSignUp = async () => {
  if(await validateForm()) {
    console.log("first")
  }
}

const fields = {
  email,
  password,
  confirmPassword,
  fullName,
} as any;

Object.keys(fields).forEach((key) => {
  watch(fields[key], () => validateField(key));
});
</script>

<style scoped></style>
