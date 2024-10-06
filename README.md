# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



El proyecto ***PORTAL VIRTUAL PARA LA TELESECUNDARIA 763*** es una plataforma educativa diseñada para facilitar los procesos de captura de información de los alumnos de esta institución. Los principales usuarios son los docentes, junto con el personal administrativo y directivo. Los módulos principales del portal incluyen la captura de calificaciones, la descarga de calificaciones en formato Excel, y la visualización de estadísticas gráficas, brindando una herramienta integral para la gestión y análisis de la información académica.


### Funcionalidades Clave ###
- ***Captura de Calificaciones mediante Excel***: Los docentes pueden registrar calificaciones a través de archivos Excel, agilizando el proceso y evitando la captura manual.
- ***Gestión de Alumnos***: Los profesores pueden gestionar a los alumnos por periodos, grupos y grados, permitiendo un seguimiento organizado de los estudiantes.
- ***Visualización de Estadísticas Gráficas***: El portal genera reportes basados en los resultados de las calificaciones, proporcionando gráficos que muestran el rendimiento académico de los alumnos.
- ***Sistema de Calificaciones***: Permite introducir y gestionar las calificaciones de cada alumno de manera eficiente y organizada.
- ***Notificaciones en Tiempo Real***: El personal administrativo recibe notificaciones sobre la gestión de usuarios y puede realizar acciones como actualizar periodos, gestionar nuevos alumnos, registrar bajas, y realizar otros cambios relevantes en tiempo real.

  
## Objetivo General
El proyecto consiste en desarrollar una Progressive Web App (PWA) que integre un sistema de suscripción por periodo, notificaciones push en tiempo real, funcionalidad offline, y una pasarela de pagos segura y efectiva. Esta aplicación está dirigida exclusivamente a docentes, administrativos y directivos, permitiéndoles, tras completar un periodo de prueba, realizar diversas acciones como cargar calificaciones, visualizar estadísticas y más. El objetivo es proporcionar una solución accesible y eficiente para la gestión educativa, garantizando una experiencia de usuario fluida y segura.


## Metodología de Trabajo
***Selección de Metodología de Desarrollo Ágil (Scrum)***
- Scrum fue seleccionada para el desarrollo de una PWA para la Telesecundaria 763, por su enfoque ágil y adaptabilidad a las necesidades educativas.
- Esta metodología organiza el trabajo en sprints cortos que permiten la entrega continua de incrementos funcionales. Cada sprint incluye planificación, ejecución, revisión y retrospectiva, garantizando un proceso iterativo y adaptable.
- Scrum promueve la colaboración entre desarrolladores y el personal de la escuela, facilitando la resolución rápida de problemas. Además, permite priorizar las funcionalidades clave y adaptarse a cambios durante el desarrollo, cumpliendo con las expectativas del cliente.

***Justificación:***
- Scrum es ideal para el desarrollo de la PWA de la Telesecundaria 763, por su enfoque estructurado y flexible.
- La división en sprints cortos facilita la entrega incremental y la rápida adaptación a los cambios. La metodología fomenta la transparencia y colaboración a través de reuniones diarias, asegurando que el equipo esté alineado y que los problemas se resuelvan rápidamente.
- La interacción continua con el cliente asegura que el producto final cumpla con sus necesidades, ofreciendo adaptabilidad, eficiencia y una comunicación clara.


## Herramienta de Control de Versiones ##
- Para el control de versiones, se utilizará Git en conjunto con GitHub como plataforma de repositorio remoto.
- Esta combinación permitirá gestionar las diferentes ramas y versiones del proyecto de manera eficiente, además de facilitar la colaboración entre los miembros del equipo y automatizar procesos mediante la integración continua.

***Flujo de Trabajo***
1. **Crear una nueva rama** para cada funcionalidad o tarea específica.
```bash
git checkout -b feature/branches o alguna otro nombre en especifico.
```
2. **Hacer commits** frecuentes de los cambios.
```bash
git add .
git commit -m "Descripción del cambio realizado"
```
3. **Abrir un pull request** para revisión de código por otro miembro del equipo.
```bash
git checkout main
```
4. **Integrar la rama** en `main` después de que las pruebas automáticas pasen y el código sea aprobado.
```bash
git merge feature/branches u otro nombre de la funcionalidad creada.
```


## Estrategia de Despliegue
Para el despliegue del proyecto, se ha seleccionado la estrategia de **Rolling**, que permite realizar actualizaciones de la aplicación sin tiempos de inactividad.

### Entornos de Despliegue Definidos:
- ***Desarrollo:*** Donde se realizan pruebas locales y los desarrolladores pueden integrar nuevas funcionalidades.
- ***Staging (Preproducción):*** Un entorno que replica la configuración de producción para realizar pruebas finales antes del despliegue definitivo.
- ***Producción:*** El entorno en el cual el sistema está disponible para los usuarios finales y donde se despliegan las versiones estables del proyecto.


## Proceso de CI/CD
Se utiliza **Integración Continua (CI)** para asegurar que cada cambio que se integra al tronco principal pase por un proceso automatizado de pruebas. Cuando todas las pruebas pasan, el código se despliega automáticamente en los entornos de **Staging** y posteriormente en **Producción**.

## Instrucciones para Contribuir

1. **Clonar el repositorio**: Esto descargará una copia del código fuente en tu máquina local.
```bash
git clone https://github.com//Eduardo20210681LALO/telesecundaria_763
```
2. **Entrar en el directorio del proyecto**: Accede al directorio clonado donde está el código del proyecto.
```bash
cd telesecundaria_763
```
3. **Instalar dependencias**: Esto instalará todas las dependencias necesarias del proyecto especificadas en package.json.
```bash
npm install
```
4. **Ejecutar el proyecto en modo desarrollo**: Inicia el servidor en modo desarrollo. Esto te permitirá ver la aplicación en tiempo real y se recargará automáticamente cuando realices cambios en el código.
```bash
npm run dev
```
5. **Ejecutar las pruebas**: Corre las pruebas automatizadas del proyecto para asegurarse de que todo funcione correctamente.
```bash
npm run test
```