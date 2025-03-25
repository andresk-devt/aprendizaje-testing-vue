// Pruebas unitarias
import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach } from "vitest";
import RegisterForm from "../../components/funcionalidad_1/RegisterForm.vue";

/**
 * Describe un grupo de pruebas para el componente de RegisterForm.vue
 * `describe` se usa para agrupar pruebas relacionadas con una misma funcionalidad o componente.
 *  */
describe("RegisterForm.vue", () => {
  /**
   * Creamos una instancia del componente en un entorno de pruebas (DOM virtual).
   * `mount` renderiza el componente por completo, incluyendo su estado, métodos y eventos.
   * 
   * Esta instancia se esta usando para estos casos ya que los datos que modificamos no afectan las otras pruebas,
   * pero una buena practica es tener una instancia x cada test ya que las modificaciones anteriores pueden alterar
   * el test. Aunque tener una instancia por cada test afecta el performance de nuestros test, analiza si es necesario
   * tener la instancia por cada test o en que casos poder reusar la instancia.
   */
  let wrapper;
  
  beforeEach(() => {
    wrapper = mount(RegisterForm);
  });
  /**
   * Prueba para validar el formato del email.
   * 
   * En esta prueba verificamos que la función `validateEmailFormat` del componente
   * correctamente determine si un email tiene un formato válido o no.
   */
  it("Should validate the email format and return if this one is valid or not", () => {
    // Accedemos a la función de la validación de email dentro del componente.
    const emailValidationFunction = wrapper.vm.validateEmailFormat;

    /**
     * Evaluamos dos casos de pruebas pasando por parametros dos textos, correo correcto e incorrecto.
     * `toBe`Asercion con la cual podemos comprobar los valores primitivos de javascript. 
     */
    expect(emailValidationFunction("test@example.com")).toBe(true); // Caso válido
    expect(emailValidationFunction("invalid-email")).toBe(false); // Caso inválido
  });

  /**
   * Prueba para validar los requisitos de una contraseña segura.
   * 
   * En esta prueba verificamos que la función `validatePasswordFormat` dentro del componente
   * determine si una contraseña cumple con los criterios de seguridad requeridos.
   */
  it("Should validate the requirements for a valid/safe password function", () => {
    const passwordValidationFunction = wrapper.vm.validatePasswordFormat;

    expect(passwordValidationFunction("Valid123!")).toBe(true);
    expect(passwordValidationFunction("short")).toBe(false);
    /**
     * En el proceso en el que me encontraba aprendiendo y trabajando en este repo para enseñar
     * me decia; tirar pruebas es algo muy irrelevante porque siempre vamos a tener un flujo de como 
     * funciona la logica de nuestro codigo en nuestra cabeza y con ese mismo flujo vamos a tirar nuestras pruebas
     * pero aqui te dejo un caso de error.
     * 
     * Caso 1: Escribir una contraseña con más de 8 caracteres, con más mayusculas de las requeridas, 
     * más simbolos de los requeridos, a ver como se comporta nuestra función.
     * 
     * (Por cuestion de aprendizaje se deja comentado el test `caso de error` (Linea 60) que nos da un feedback
     * que algo esta mal en esta contraseña con la funcion de validación).
     * 
     * Evidentemente en el regex, no permite el simbolo del guion bajo '_' por lo que este caso de string falla,
     * y el test nos da un feedback que hay que pasar a cambiar algo en la lógica de nuestro codigo.
     */
    // expect(passwordValidationFunction("Ejemplo012_Ejempl012!")).toBe(true);
  });

  it('Should validate the function `validateFormFields` with several data cases in formData', () => {
    const validateFormFieldFunction = wrapper.vm.validateFormFields;

    // Caso 1: Datos completamente válidos
    wrapper.vm.formData = {
      username: "testUser",
      name: "John Doe",
      address: "123 Main St",
      email: "test@example.com",
      password: "Valid123!",
    };
    
    expect(validateFormFieldFunction()).toBe(true);
    expect(wrapper.vm.errors).toEqual({
      username: false,
      address: false,
      name: false,
      email: false,
      password: false,
    });

    // Caso 2: Campo obligatorio vacio (username)
    wrapper.vm.formData.username = null;

    expect(validateFormFieldFunction()).toBe(false);
    expect(wrapper.vm.errors.username).toBe(true);

    // Caso 3: Todos los campos obligatorios vacios.
    wrapper.vm.formData = {
      username: "",
      name: "",
      address: "Cll 33 SUR 25 A 21",
      email: "",
      password: "",
    };
    expect(validateFormFieldFunction()).toBe(false);
    expect(wrapper.vm.errors).toEqual({
      username: true,
      name: true,
      address: false,
      email: true,
      password: true,
    });

    // Caso 4: Address vacio pero los otros campos correctos (debe ser válido ya que el addres no es requerido).
    wrapper.vm.formData = {
      username: "xandresk-devt333",
      name: "Andres Camilo",
      address: null,
      email: "andres.gomez@guane.com.co",
      password: "Ejemplo123!",
    }

    expect(validateFormFieldFunction()).toBe(true);
    expect(wrapper.vm.errors).toEqual({
      username: false,
      name: false,
      address: false,
      email: false,
      password: false,
    });
  });
});
