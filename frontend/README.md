# Challenge para Toolbox - Frontend

Para esta parte del challenge monté una aplicación de React lo mas "a mano" que pude, instalando react y react-dom con webpack y babel para el bundle y transpilación. Todo esto en la verrsion 16.20.2 de Node.

Normalmente, si tuviera que iniciar un proyecto de React desde 0, mi herramienta predilecta es Vite, agiliza mucho el proceso de budling y se integra fácilmente con otras tecnologias (ej. preprocesadores de CSS cómo Sass). Así mismo siempre intento tener la ultima LTS de Node ya que, basado en experiencias anteriores, la deuda técnica en este apartado es especialemente difícil de gestionar cuando se hace muy grande.

## Fetching de datos y capa de abstracción:

Empleé el uso de servicios como una capa de abstracción donde se implementa el fetching de datos con axios, esto es una carpeta `/services` donde estan los archivos que implementan la logica de fetching de datos, estos servicios actuan como una interfaz con los hooks reduciendo el acoplamiento y promoviendo la modularidad. Si algún día cambia la forma de obtener los datos (ej. se decide usar la función `fetch` en lugar de Axios), el ajuste debe hacerse en solamente estos archivos.

## Uso de Hooks para el fetching de datos:

Implementé los hooks `useFileList` y `useFileData` para obtener la lista de archivos y los datos de los archivos respectivamente. Es interesante notar como los hooks manejan los principales estados de una petición HTTP como los son los errores, la respuesta y adicionalmente le estado "loading" mientras se esta haciendo el fetching de datos. Los hooks devuelven estos estados abstrayendo esta logica de los componentes que los implementan y, al ser hooks, los componetes se re-renderizan ni bien cambien cualquiera de los estados.

El hook `useFileData` acepta un parametro opcional `fileName`. Cuando este parámetro está presente, lo propaga al servicio para que se incluya como un query param en la request, permitiendo asi obtener la información de un archivo individual. Si este parámetro no esta presente, se obtiene la información de todos los archivos disponibles.

## Puntos opcionales:

- ### Filtrar por nombre de archivo

  Implementé un selector de tipo dropdown que, además de permitir filtrar los datos de la tabla por nombre de arhivo, también implementa el endpoint `/files/list` para obtener los nombres de los archivos disponibles y mostrarlos en el menú desplegable. Al hacer click en alguna opción, el cambio de estado del archivo seleccionado dispara un refetch del hook `useFileData`, si corresponde, con el nombre del archivo a filtrar.

- ### Uso de Redux

  Conozco Redux, lo he utilizado bastante a lo largo de mi experiencia, es una librerira que permite manejar el estado global de una aplicación en react. En este caso decidí no utilizarlo porque realmente no es necesario y, a pesar de que es un challenge, manejar el poco estado de la aplicación (que ya maneja en su mayoría los hooks) de forma global, no compensa la cantidad de boilerplate necesario para que Redux funcione. Una alternativa a Redux mucho mas limpia que se ha convertido en mi favorita en el ultimo tiempoo es [Zustand](https://zustand-demo.pmnd.rs/), basicamente es lo mismo que Redux pero con mucho menos código.

- ### Tests Unitarios con Jest
  Implemente tests muy basicos para los hooks, asegurando que los estados internos cambien de la forma esperada tanto para los casos de éxito como los casos de error. Cabe aclarar que estos tests podrian ser mas complejos y abarcar mas casos, como los tipos de datos, validación si la hubiese, etc. A fines del challenge para mí fue mejor mantenerlo simple.
