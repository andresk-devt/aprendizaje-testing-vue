<template>
  <nav class="bg-gray-800">
    <div class="w-full px-2 sm:px-6 lg:px-8 p-3">
      <div
        class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
      >
        <div class="hidden sm:block">
          <div class="flex space-x-4">
            <router-link
              to="/register"
              href="#"
              class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
              aria-current="page"
            >
              Register Form
            </router-link>
            <router-link
              to="/requests"
              href="#"
              class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
              Request List
            </router-link>
            <a
              href="#"
              class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >Funtionality 3</a
            >
            <a
              href="#"
              class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >Funtionality 4</a
            >
          </div>
        </div>
      </div>
    </div>

    <div class="sm:hidden" id="mobile-menu">
      <div class="space-y-1 px-2 pt-2 pb-3">
        <router-link
          to="/register"
          class="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
          aria-current="page"
          >Register Form</router-link
        >
        <router-link
          to="/requests"
          class="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
          aria-current="page"
          >Request List</router-link
        >
        <a
          href="#"
          class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >Funtionality 3</a
        >
        <a
          href="#"
          class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >Funtionality 4</a
        >
      </div>
    </div>
  </nav>
</template>
