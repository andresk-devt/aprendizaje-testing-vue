# Aprendizaje de testing unitario frontend de una aplicacion (vue3)


## Introduccion al repositorio
En este repo encontraremos una explicación breve y detallada de, los primeros pasos que necesitamos para adentrarnos al mundo del testing en nuestras aplicaciones front-end.

**¿Cómo leer la aplicación?**
En este README, tenemos una introduccion a como leer el repositorio y los ejemplos practicos, ademas de una secuencia de información general que debemos de tener en cuenta para escribir test de calidad.

Imange 1.
![Ruta de los proyectos](/src/assets/ruta_funcionalidades.png)

En el repositorio, encontraremos una carpeta llamada `components`, que contiene varias subcarpetas organizadas por funcionalidad, cada una identificada con un nombre y un número.

Por ejemplo, al abrir la carpeta `funcionalidad_1` (como se muestra en la imagen), veremos un archivo `componente.vue`, que corresponde a dicha funcionalidad, y un archivo `README`.

En el `README`, se encuentra una descripción detallada de los requerimientos específicos de este módulo (Es importante leer estos requisitos para entender el por que de la logica del componente).

Imagen 2.
![Ruta de los test de la funcionalidades](/src/assets/ruta_test_funcionalidades.png)

Luego, como se muestra en la imagen 2, encontramos una carpeta llamada `test`, que contiene dos subcarpetas: `units` e `integration`.  

- En `units` se encuentran las pruebas unitarias.  
- En `integration` se encuentran las pruebas de integración.  

Dentro de estas carpetas, los archivos de prueba están nombrados según el componente a testear y tienen la extensión `.test.js`.

Imagen 3.
![Test de ejemplo](/src/assets/test_ejemplo.png)

En la imagen 3, podemos ver que los archivos de práctica de pruebas incluyen comentarios que explican detalladamente cada test.  

Estos comentarios describen los métodos utilizados y las pruebas realizadas, proporcionando una mejor comprensión del proceso de testeo.  


## Dudas acerca del testing | Explicación

#### Aserciones y tipo de Aserciones:
Las aserciones son condiciones que verifican si el comportamiento del código cumple con lo esperado.

#### *1. Aserciones de Igualdad*
Verifican si dos valores son iguales o no.  
✅ Úsala cuando necesitas verificar valores primitivos (números, strings, booleanos) y quieres que sean exactamente iguales.  
❌ No la uses para objetos o arrays, ya que verifica la referencia en memoria, no solo los valores.
```bash
expect(2 + 2).toBe(4);
```

#### *2. Aserciones de Verdad*
Verifican si un valor es verdadero o falso.  
✅ Úsala cuando necesitas verificar si un valor es true o false en un contexto lógico.  
❌ No la uses si necesitas comprobar valores específicos (usa toBe o toEqual).
```bash
expect(true).toBeTruthy();
expect(false).toBeFalsy();
```

#### *3. Aserciones de Comparación*
Verifican si un valor es mayor, menor o está dentro de un rango.  
✅ Úsala cuando necesitas verificar relaciones de orden (mayor que, menor que, etc.).  
❌ No la uses para comparar valores exactos cuando pueda haber variaciones mínimas (usa toBeCloseTo en su lugar).
```bash
expect(10).toBeGreaterThan(5);
expect(3).toBeLessThanOrEqual(5);
```

#### *4. Aserciones de Contenido*
Verifican si un elemento está dentro de una lista, string o estructura de datos.  
✅ Úsala cuando quieres verificar si un elemento está dentro de un array, string o lista.  
❌ No la uses para comparar estructuras completas (usa toEqual).
```bash
expect([1, 2, 3]).toContain(2);
expect("Hello World").toMatch(/World/);
```

#### *5. Aserciones de Excepción o Error*
Verifican si una función lanza una excepción esperada.  
✅ Úsala cuando necesitas verificar si una función lanza un error esperado.
```bash
expect(() => { throw new Error("Error!") }).toThrow("Error!");
```

#### *6. Aserciones de Referencia u Objeto*
Verifican si dos objetos son iguales por referencia o valor.  
✅ Úsala cuando necesites comparar objetos o arrays por valor y no por referencia.  
❌ No la uses para comparar objetos por referencia (usa toBe en su lugar).
```bash
const obj = { a: 1 };
expect(obj).toEqual({ a: 1 });  // Compara contenido
expect(obj).not.toBe({ a: 1 }); // Compara referencia
```

Para mas informacion de las aserciones que podemos usar, accede a la siguiente [lista de acersiones.](https://jestjs.io/docs/expect)

#### ¿Cómo testeamos?

Cuando vamos a escribir pruebas a una funcionalidad, debemos responder las siguientes dudas para asegurarnos de escribir una prueba optima y eficiente:   
**¿Qué funcionalidad queremos verificar?  
¿Cuáles son los posibles valores de entrada y salida?  
¿Qué errores podrían ocurrir?**

## Caracteristicas de un buen test
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
- [Documentacion de jest, asersiones, mocks, snapshot, etc.](https://jestjs.io/docs/getting-started)
- [Recurso de buenas practicas para aplicar en nuestros test.](https://www.ibm.com/es-es/topics/software-testing)
- [¿Cómo escribir pruebas unitarias efectivas?](https://bytealdia.com/como-escribir-pruebas-unitarias-efectivas/)