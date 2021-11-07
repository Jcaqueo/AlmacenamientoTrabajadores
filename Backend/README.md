# Instrucciones Respecto al Backend
A continuación se dejarán unas breves consideraciónes para la correcta ejecución del Backend

## Modificar config.js

En el directorio del backend, ir a config y abrir config.js, archivo en el cual se deberá editar "password" por la contraseña propia de postgress.
Para migrar la base de datos, basta con ejecutar las siguientes lineas en la terminal:
### `npx sequelize-cli db:create`
### `npx sequelize-cli db:migrate`

## Instalar dependencias

En el directorio del backend, ejecutar

### `npm install`

Lo que hará la reconstrucción de los módulos necesarios para la ejecución.

## Consideraciónes de ejecución
Puede que sea necesario instalar manualmente alguno de los módulos (a uno de nosotros le ocurrió que le faltaba el bcrypt), por ende, para la instalación manual del módulo que esté ausente (y por ende, cause el error) se deberá ejecutar alguno de los siquientes comandos:
### `npm i express`
### `npm i -D nodemon`
### `npm i sequelize pg pg-hstore`
### `npm i sequelize-cli -D`
### `npm i bcrypt`
### `npm i jsonwebtoken dotenv`
### `npm i cors`
Con lo cual podrá proseguir a la ejecución del backend sin problemas.
##  Agregar Jefe de Proyecto(Recomendación = POSTMAN)
Es necesario agregar un jefe de proyecto, ya que es quien podrá crear y modificar todas las instancias relacionadas al proyecto, y por ende, solamente puede crearse desde la base de datos.
Para agregar un jefe de proyecto, utilizar un método POST en la siguiente dirección:
### `localhost:3004/auth/register/pm`
Y para el cuerpo, usar el siguiente formato:
{
    "email" : "joaquin.caqueo@sansano.usm.cl",
    "pass" : "123",
    "phone" : "11111111",
    "name" : "Joaquin Caqueo",
    "company" : "nana"
}
##  Ejecución

En el directorio del backend, basta con ejecutar

### `npm start`
Para montar el backend, el cual correrá en el PORT 3004
