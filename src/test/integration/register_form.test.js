// Pruebas de integración
import { mount } from "@vue/test-utils";
import { vi, describe, expect, it, beforeEach } from "vitest";
import RegisterForm from "../../components/funcionalidad_1/RegisterForm.vue";
import Swal from "sweetalert2";

/**
 * Mockeamos la funcion del sweetalert, para simular en nuestras pruebas
 * la alerta del mensaje cuando se crea una cuenta.
 */
vi.mock("sweetalert2", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    default: {
      ...actual.default,
      fire: vi.fn(),
    },
  };
});

/**
 * En los test de integracion se intenta probar el flujo completo de nuestra funcionalidad,
 * a diferencia del unitario que prueba funciones especificas o el componente de manera aislada
 * En este se combinan todas las funciones y casos de uso que requiere el flujo completo del modulo ademas de interactuar
 * directamente con los elementos del HTML
*/
describe("RegisterForm Integration Test", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(RegisterForm);
  });

  /**
   * Caso 1: Si el usuario le da click al boton submit del formulario recien renderizado el componente
   * ¿Como deberia de reaccionar el componente? R/ Disparar los errores de los campos que son requeridos.
   */
  it("When the form data is empty shows an errors inputs", async () => {
    await wrapper.find("form").trigger("submit.prevent");

    expect(wrapper.vm.errors.username).toBe(true);
    expect(wrapper.vm.errors.name).toBe(true);
    expect(wrapper.vm.errors.email).toBe(true);
    expect(wrapper.vm.errors.password).toBe(true);
  });

  /**
   * Caso 2: Si el usuario agrega al input del correo, un dato que no sea de tipo email si no cualquier
   * texto.
   * ¿Como deberia de reaccionar el componente? R/ Disparar el error a la propiedad de email ya que el 
   * dato ingresado no pasa los parametros que nos pide la funcionalidad.
   */
  it("Should validate an invalid email and set the email error", async () => {
    await wrapper.find("input[name='email']").setValue("invalid-email");
    await wrapper.find("form").trigger("submit.prevent");

    expect(wrapper.vm.errors.email).toBe(true);
  });

  /**
   * Caso 3: Si el usuario agrega al input de la contraseña, un dato que no cumpla los parametros de seguridad
   * de nuestra aplicacion.
   * ¿Como deberia de reaccionar el componente? R/ Disparar el error a la propiedad de password ya que el
   * dato ingresado no pasa los parametros de seguridad que nos pide la funcionalidad.
   */
  it("Should validate an invalid password and set the password error", async () => {
    await wrapper.find("input[name='password']").setValue("123456");
    await wrapper.find("form").trigger("submit.prevent");

    expect(wrapper.vm.errors.password).toBe(true);
  });

  /**
   * Caso 4: Cuando el usuario llena el formulario con los datos requeridos, no saltan los errores ya que los datos
   * pasan las validaciones que requiere nuestra funcionalidad.
   * ¿Como deberia de reaccionar el componente? R/ Dispara nuestra funcion para crear el usuario en el sistema, una
   * alerta que informa al usuario que su cuenta a sido creada de manera exitosa y resetear los campos del formulario
   * para estar preparado para hacer la creacion de una nueva cuenta.
   */

  it("When the submit is triggered with a correct data values show the successfuly alert", async () => {
    await wrapper.find("input[name='username']").setValue("andresk-devt");
    await wrapper.find("input[name='name']").setValue("Andres Camilo");
    await wrapper.find("input[name='email']").setValue("test@example.com");
    await wrapper.find("input[name='password']").setValue("Valid@123");

    await wrapper.find("form").trigger("submit.prevent");

    expect(Swal.fire).toHaveBeenCalledWith({
      title: "User successfully created!",
      icon: "success",
      draggable: true,
    });

    expect(wrapper.vm.formData.username).toBe(null);
    expect(wrapper.vm.formData.email).toBe(null);
    expect(wrapper.vm.formData.password).toBe(null);
  });
});