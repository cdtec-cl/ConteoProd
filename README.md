#Backend
```
Requerimientos Técnicos

Php 7.2
Virtual server(Apache2 o ngnix).
composer.

¿Cómo se instala?

Clonar el proyecto en la dirección de su preferencia del servidor. 
Se ubica en la carpeta del proyecto clonado, en la siguiente carpeta /backend. 
En la carpeta indicada dar permisos a storage sudo chmod -R 755 storageEjecute composer install
Ejecute php artisan key:generate. 
cree un nuevo apy key php artisan key:generate
Cree en la base de datos mysql php artisan migrate --seed
