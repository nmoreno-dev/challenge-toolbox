# Challenge para Toolbox - Backend

Para esta parte del challenge monté un servidor de express en node.js

Normalmente, si tuviera que iniciar un proyecto backend con Node, utilizaría la última LTS disponible y fundamentalmente Typescript, creo que es importantísimo para el desarrollo web moderno de hoy en día.

## Fetching de datos y capa de abstracción:

Empleé el uso de servicios como una capa de abstracción donde se implementa el fetching de datos con axios, esto es una carpeta `/services` donde estan los archivos que implementan la logica de fetching de datos, estos servicios actuan como una interfaz con los controladores reduciendo el acoplamiento y promoviendo la modularidad. Si algún día cambia la forma de obtener los datos (ej. se decide usar la función `fetch` en lugar de Axios), el ajuste debe hacerse en solamente estos archivos.

## Dificultades con Mocha y la versión 14 de Node.

Implementé tests basicos con Mocha y Chai pero el challenge exigia usar sintaxis ES6+ y Node 14. Bueno, no lograba hacer que Mocha importase correctamente los ES Modules propios de la sintaxis ES6. Estuve literalmente horas hablando con todas las IAs y navegando por todo StackOverflow donde encontré algunas alternativas que implicaban el uso de transpiladores como Babel pero el uso de esto estaba prohibido por el challenge.

En fin, en un momento sentí que estaba intentando matar una ballena a chancletazos, estaba en un callejón sin salida, asi que decidí finjir demencia e instalar la version 16 de node donde los tests se ejecutaban perfectamente. Cabe aclarar que, a pesar de que los tests no funcionacen en Node 14, la aplicación se comportaba como se esperaba, ningun problema ahí.

## Logger:

Implementé un logger con diferentes niveles de log utilizando Winston, mi herramienta preferida de logging. Los errores se guardan en el archvio `/log/error.log`, se peude configurar que nivel de alerta se desea guardar en un archivo.

## Puntos opcionales:

- ### Filtrar por nombre de archivo

  En el controlador del endpoint `/files/data`, agregué un query param `fileName`. Cuando este está presente, se hace obtienen los datos de ese archivo solamente y se manejan los posibles errores.

- ### Endpoint GET /files/list

  Simple y al grando, devuelve la lista de archivos.

- ### StandarJs
  Quise usar ESLint, mi linter preferido, debido a la incopatibilidad con la version de node, decidí no usar linter, conozco Standar Style, nunca lo he trabajado porque, como digo, siempre uso ESLint. No obstante, utilicé prettier para el formateo de codigo, algunas reglas coinciden con las presentes en Standard Style
