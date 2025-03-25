<script setup>
import { ref } from "vue";
import Swal from "sweetalert2";

const errors = ref({
  username: false,
  name: false,
  email: false,
  password: false,
});

const formData = ref({
  username: null,
  name: null,
  address: null,
  email: null,
  password: null,
});

const validateEmailFormat = (email) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
};

const validatePasswordFormat = (password) => {
  const passwordPattern =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordPattern.test(password);
};

const validateFormFields = () => {
  let isValid = true;
  Object.keys(formData.value).forEach((key) => {
    const element = formData.value[key];
    let hasError = false;
    if (!element || element.trim() === "") {
      hasError = true;
    }
    if (key === "email" && !validateEmailFormat(element)) {
      hasError = true;
    }
    if (key === "password" && !validatePasswordFormat(element)) {
      hasError = true;
    }
    if (key === "address") {
      hasError = false;
    }
    if (hasError) {
      isValid = false;
    }
    errors.value[key] = hasError;
  });
  return isValid;
};

const resetFormData = () => {
  formData.value = {
    username: null,
    name: null,
    address: null,
    email: null,
    password: null,
  };
};

const registerUser = (e) => {
  e.preventDefault();
  if (validateFormFields()) {
    console.log("Formulario válido. Procediendo con el registro del usuario.");
    Swal.fire({
      title: "User successfully created!",
      icon: "success",
      draggable: true,
    });
    resetFormData();
  } else {
    console.log("Formulario inválido. No se puede registrar al usuario.");
  }
};
</script>

<template>
  <div class="">
    <h1 class="text-2xl font-bold">Register form</h1>
    <form class="flex items-center flex-col gap-3">
      <div class="mt-3 w-sm">
        <div class="sm:col-span-4">
          <label
            for="username"
            class="block text-sm/6 font-medium text-gray-900 text-start"
            >Username</label
          >
          <div class="mt-2">
            <div
              class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
              :class="
                errors['username'] ? 'border-3 !bg-red-50 border-red-400' : ''
              "
            >
              <input
                type="text"
                name="username"
                id="username"
                class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                placeholder="andresk-devt"
                v-model="formData.username"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="w-sm">
        <div class="sm:col-span-4">
          <label
            for="name"
            class="block text-sm/6 font-medium text-gray-900 text-start"
            >Name</label
          >
          <div class="mt-2">
            <div
              class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
              :class="
                errors['name'] ? 'border-3 !bg-red-50 border-red-400' : ''
              "
            >
              <input
                type="text"
                name="name"
                id="name"
                class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                placeholder="Andres Camilo"
                v-model="formData.name"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="w-sm">
        <div class="sm:col-span-4">
          <label
            for="address"
            class="block text-sm/6 font-medium text-gray-900 text-start"
            >Address</label
          >
          <div class="mt-2">
            <div
              class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
            >
              <input
                type="text"
                name="address"
                id="address"
                class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                placeholder="136 W 3rd St, New York, NY 10012, USA"
                v-model="formData.address"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="w-sm">
        <div class="sm:col-span-4">
          <label
            for="email"
            class="block text-sm/6 font-medium text-gray-900 text-start"
            >Email</label
          >
          <div class="mt-2">
            <div
              class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
              :class="
                errors['email'] ? 'border-3 !bg-red-50 border-red-400' : ''
              "
            >
              <input
                type="email"
                name="email"
                id="email"
                class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                placeholder="teting@example.com"
                v-model="formData.email"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="w-sm">
        <div class="sm:col-span-4">
          <label
            for="password"
            class="block text-sm/6 font-medium text-gray-900 text-start"
            >Password</label
          >
          <div class="mt-2">
            <div
              class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
              :class="
                errors['password'] ? 'border-3 !bg-red-50 border-red-400' : ''
              "
            >
              <input
                type="password"
                name="password"
                id="password"
                class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                placeholder=""
                v-model="formData.password"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="w-sm">
        <button
          class="bg-gray-800 text-white rounded-lg p-2 cursor-pointer w-full"
          @click="registerUser($event)"
        >
          Register user
        </button>
      </div>
    </form>
  </div>
</template>
