import { mount, shallowMount } from "@vue/test-utils";
import { describe, it, expect, beforeEach } from "vitest";
import RegisterForm from "../../components/funcionalidad_1/RegisterForm.vue";

describe("RegisterForm", () => {
  const wrapper = mount(RegisterForm);

  it("Should validate the email format and return if this one is valid or not", () => {
    const emailValidationFunction = wrapper.vm.validateEmailFormat;

    expect(emailValidationFunction("test@example.com")).toBe(true);
    expect(emailValidationFunction("invalid-email")).toBe(false);
  });

  it("Should validate the requirements for a valid/safe password function", () => {
    const passwordValidationFunction = wrapper.vm.validatePasswordFormat;

    expect(passwordValidationFunction("Valid123!")).toBe(true);
    expect(passwordValidationFunction("short")).toBe(false);
  });
});
