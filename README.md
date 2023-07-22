# Desafío de React Native:

Lista básica de currencies

Objetivo:

- Crear una aplicación de lista de crypto currencies básica utilizando React Native, TypeScript, y persistencia local de datos que permita al usuario listar las currencies y al hacerle click muestre el detalle de la misma, y pueda agregarla/removerla como favorita. Utilizar la [API de coingecko](https://www.coingecko.com/en/api/documentation):

- /list
- /coins/{id}

## Pantalla de listado: listar currencies y permitir filtrar por nombre

- symbol (logo)
- nombre

## Pantalla de detalle:

- Imagen
- Mostrar Nombre y simbolo de la criptomoneda, ej. Bitcoin (BTC)
- Mostrar precio actual (en USD)
- Boton para agregar/remover de favoritos

### Requisitos:

- Utiliza hooks de React, como useState y useEffect, para administrar el estado de la aplicación y los efectos secundarios.
- Manejo de estados de las peticiones async
- Implementa la persistencia local de datos para que las currencies agregadas a favoritos para que se mantengan incluso al cerrar y abrir la aplicación.
- Implementar test con jest react-native-testing-library
- Utiliza TypeScript para garantizar el tipado estático en el código.

### Puntos adicionales (opcional):

- Implementa estilos personalizados para mejorar la apariencia de la lista de currencies y detalle.
- Mejora la experiencia de usuario al agregar animaciones o transiciones suaves.
- Utiliza una solución de persistencia local, como AsyncStorage de React Native, para guardar y cargar las currencies favoritas.
- Buscador de cryptos

### Wireframes

<br>

<img src="https://lh6.googleusercontent.com/KM4NGYFlddyTUwvsWzLVODyqvJGsVqzMRZA_fMKzzmuM7cONGMGTqMLca7mXNXmkwUGvyUjqKTRLr5U7oJkG6ci0ZGe_98xjmyBfGFgmWZ4oiOAREuqM7HY7qY5mlvF7I1PFVJOnMmBULpiILnHEnc4" width="500">

<img src="https://lh5.googleusercontent.com/9pUNw8EfWAKYCbIre5CH7MAWMfwIj7q5RiiByP3oGaljo-QRc_1WcouzhJ6KBPdh3C4Cjk0TFEPrYBqkpP-HpYHTQFnbFg1b60WEN0ZO2XyawTgFIuUWLzq99mUl7jBJQBsXmbI6voNHaXE0z9T549Q" width="150" />
