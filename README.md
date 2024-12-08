# Back Buzón Comunitario

Este proyecto es el backend de la aplicación **Buzón Comunitario**, una plataforma para gestionar quejas, sugerencias y reportes de la comunidad. El backend está diseñado para permitir a los ciudadanos enviar reportes y a las autoridades locales gestionarlos de manera eficiente.

## Funcionalidades

- **Gestión de quejas**: Los usuarios pueden registrar quejas con detalles como descripción, imágenes y ubicación.
- **Gestión de usuarios**: Los administradores pueden gestionar los perfiles de los usuarios y asignar roles.
- **Notificaciones**: Los usuarios reciben notificaciones cuando se registran y cuando se crea un reporte de alguna queja.
- **Análisis de reportes**: Los administradores pueden analizar los reportes y generar informes.
- **Integración con servicios externos**: El sistema está integrado con servicios como cloudinary para el almacenamiento de imágenes, SMTO GMAIL y twelio para la gestión de notificaciones al usuario.

## Tecnologías utilizadas

- **Node.js**: Plataforma para la ejecución del servidor backend.
- **Express.js**: Framework para Node.js que facilita la creación de APIs RESTful.
- **MongoDB**: Base de datos NoSQL utilizada para almacenar la información de los reportes y usuarios.
- **JWT (JSON Web Tokens)**: Autenticación segura mediante tokens.
- **sequelize**: para interectuar con mysql.
- **Mongoose**: ODM para interactuar con MongoDB desde Node.js.
- **Nodemailer**: Para el envío de correos electrónicos (por ejemplo, para confirmar el registro de usuarios).
- **RabbitMQ**: Sistema de mensajería para gestionar las notificaciones y otros procesos asincrónicos.
  
## configura las variables de entorno:

MONGODB_URI=
PORT=

TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_WHATSAPP_NUMBER=

GMAIL_APP_PASSWORD=
JWT_SECRET=
NGROK_T=


AWS_ACCESS_KEY_ID=
secretAccessKey=
AWS_REGION=

MYSQL_HOST=
MYSQL_DB=
MYSQL_USER=
MYSQL_PASSWORD=

RDS_HOST=
RDS_USER=
RDS_PASSWORD=
RDS_DB=


RABBITMQ_URL
RABPORT=

CLOUD_NAME=
API_KEY=
API_SECRET=

API_ENVIROMENT_VARIABLE=CLOUDINARY_URL=

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/cristianrm13/Back_Buzon_Comunitario.git
   cd Back_Buzon_Comunitario
   npm install
   npm start

## Endpoints de pruebas
crear quejas
http://localhost:3000/api/v1/quejas/
ver los registros de las auditorias
http://localhost:3000/api/audit
crear usuario y obtenerlos
http://localhost:3000/api/v1/usuarios
loguearse
http://localhost:3000/api/v1/usuarios/login
crear comentarios a la queja
http://localhost:3000/api/v1/comentarios/:id
quejas del usuario por id
http://localhost:3000/api/v1/quejas/usuario/:id
