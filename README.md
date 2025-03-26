# Aprendizaje de testing unitario frontend de una aplicacion (vue3)


## Introduccion al repositorio
En este repo encontraremos una explicación breve y detallada de, los primeros pasos que necesitamos para adentrarnos al mundo del testing en nuestras aplicaciones front-end.

**¿Cómo leer la aplicación?**
En este README, tenemos una introduccion a como leer el repositorio y los ejemplos practicos, ademas de una secuencia de información general que debemos de tener en cuenta para escribir test de calidad.

![Ruta de los proyectos](/src/assets/ruta_funcionalidades.png)

En el repositorio, encontraremos una carpeta llamada `components`, que contiene varias subcarpetas organizadas por funcionalidad, cada una identificada con un nombre y un número.

Por ejemplo, al abrir la carpeta `funcionalidad_1` (como se muestra en la imagen), veremos un archivo `componente.vue`, que corresponde a dicha funcionalidad, y un archivo `README`.

En el `README`, se encuentra una descripción detallada de los requerimientos específicos de este módulo.

### Caracteristicas de un buen test
1. Claridad:

Lo primero es escribir las descripciones de los tests de forma que se entienda claramente lo que queremos probar:

```bash
describe('Email format validation', () => {
    test('Should return false when the string parameter is null');
});
```

**Esto es muy importante!** Recordemos que las pruebas no solo nos ayudan a tener un control en la calidad de nuestro codigo, si no a documentar el correcto funcionamiento que se desea sobre nuestras funciones.

La descripción del test debe responder siempre a las siguientes cuestiones: **¿Qué parte del sistema estamos probando? ¿Bajo que condiciones se está ejecutando el código? ¿Cuál es el resultado esperado?** (deben ser tanto descriptivas como sencillas de entender).

2. Rapidez:

Un buen test debe ejecutarse rápidamente, de modo que no frene el proceso de desarrollo. El tiempo que pasa entre hacer un cambio en el código y recibir el feedback de si el cambio es correcto debe ser lo más corto posible. Si tus tests son lentos, ese ciclo de retroalimentación se alarga y los costos en el desarrollo del test pueden ser poco productivos.

**¿Cómo lograr que los tests sean más rápidos?**
- La mayoria de pruebas que se cubran sean de tipo unitario.
- Evitar las pruebas que dependan de recursos externos. Pruebas que interactuan con APIs o informacion de la base de datos suelen ser mas lentas ya que requieren disponibilidad de estos servicios. En su defecto podemos usar **mocks** o **stubs** para simular la interaccion con estos resursos.

```bash
import axios from 'axios';
import { vi, expect } from 'vitest';

vi.mock('axios');

test('should return a mocked response', async () => {
  axios.get.mockResolvedValue({ data: 'response' });

  const response = await axios.get('https://api.example.com/data');

  expect(axios.get).toHaveBeenCalledWith('https://api.example.com/data');
  expect(response.data).toBe('response');
});
```
-  **Medir el tiempo** que toma  cada test o suit de tests, ayudara a identificar que pruebas son mas lentas y si hay manera de optimizarlas.

3. Cobertura:
Un buen test cubre tanto los casos felices (cuando todo va bien) como los casos de error. Es decir, debes probar no solo que el componente o función funciona correctamente, sino también que maneja los errores correctamente.

4. Mantenibilidad:
Es importante que los tests sean fáciles de mantener y de modificar. Si el código cambia, los tests también deberían poder actualizarse sin grandes dificultades.

### Documentacion

- [Aprendizaje basico y entendimiento de pruebas unitarias.](https://aws.amazon.com/es/what-is/unit-testing/)
- [Entender como y cuando se hacen pruebas unitarias, de integracion y e2e.](https://www.youtube.com/watch?v=QdqIqGPsLW0)
- [Ejemplos basicos de como escribir un test.](https://softwarecrafters.io/react/testing-frontend)