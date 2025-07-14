# Gestor de eventos para usuarios
## Descripcion
Este es un programa que ayuda a la gestion de eventos rapidos y sencillo

## Requisitos
para la ejecucion de este programa se tiene que contar primero con json-server asi como con vite para ello ejecutaremos la siguiente linea de comandos:
- - 1. npm install -g json-server
- - 2. json-server db.json --port 3001 (puesto que esta configurado para este puerto)
- - abrir otra terminal y ejecutar:
- - 1. npm  run dev
- - si no funciona esto ultimo ejecuta:
- - 1. npm install -D vite
- - 2. npm init -y
- - y ejecutas otravez run dev como antes.

## ruta de ejecucion
Podras ver que requieres de un correo y contraseña para realizar el log-in
esta se encuentra en db.json

pero para ser practicos aqui dejare las contraseñas de ambos tipos de usuario:

### admin
* email: pedrito@email  
* password: 12345

### visitor
* email: a@a  
* password: 123

Iniciaras con uno u otro dependiendo de lo que desees hacer por lo general todas las funciones estan disponibles para el admin.