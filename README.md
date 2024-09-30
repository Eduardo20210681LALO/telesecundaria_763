# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



[Proyecto_Telesecundaria763_Web_Progresiva]

1.1 Definición de los Objetivos y Alcance del Proyecto

El objetivo principal es desarrollar una aplicación móvil que permita a los usuarios acceder a funcionalidades clave como la visualización de calificaciones, estadísticas mediante gráficos, y el uso de una pasarela de pagos. El sistema ofrecerá un periodo de prueba gratuito durante el cual se podrá utilizar la aplicación sin restricciones. Al finalizar este periodo, ciertas acciones, como la carga de calificaciones y la visualización de estadísticas, serán deshabilitadas para algunos usuarios, específicamente los docentes, a menos que realicen un pago. La pasarela de pagos ofrecerá diversas opciones para que los usuarios puedan suscribirse y restaurar el acceso completo a todas las funcionalidades.

Alcance del Proyecto: El desarrollo incluirá las siguientes áreas:

Desarrollo de la interfaz de usuario (UI): Diseño de una experiencia amigable y responsiva para dispositivos móviles.
Gestión de calificaciones y estadísticas: Implementación de funcionalidades para la consulta de calificaciones y visualización de datos mediante gráficos.
Integración de la pasarela de pagos: Configuración de diversas opciones de pago y gestión de suscripciones.
Manejo de un periodo de prueba: Desarrollo de la lógica para el periodo gratuito con restricciones progresivas al finalizar dicho periodo.
Pruebas y lanzamiento: Realización de pruebas funcionales y de usabilidad, seguido del despliegue de la app en las principales plataformas móviles (iOS y Android).


1.2	Identificación del equipo de trabajo y sus roles
El equipo de trabajo está compuesto por dos programadores, quienes asumen conjuntamente múltiples responsabilidades en el desarrollo del proyecto. Ambos se encargan del diseño, desarrollo y prueba de la PWA, lo que incluye la implementación de la interfaz de usuario, la integración con el Backend y la optimización del rendimiento.

1.3	Establecimiento de los plazos y entregas del proyecto
Los plazos y entregas del proyecto se gestionan a través de la herramienta TRELLO. Cada sprint tiene una duración definida, y en esta herramienta se establece la fecha exacta de finalización para cada entrega. Esta planificación permite llevar un control detallado y organizado de los procesos, garantizando que las tareas se realicen dentro de los tiempos previstos y se logre un flujo de trabajo eficiente. Además, ClickUp facilita el seguimiento continuo de las tareas asignadas y sus fechas límite, asegurando que se cumplan los objetivos de cada sprint.


1.4	Identificación de los riesgos y las medidas para mitigarlos
1.4.1	Cambios en los requerimientos: Solicitudes de cambios pueden afectar los tiempos.
Mitigación: Reuniones periódicas con el cliente para ajustar prioridades.
1.4.2	Problemas de integración entre frontend y backend: Podría haber descoordinación.
Mitigación: Revisiones de código y pruebas de integración frecuentes.
1.4.3	Retrasos por fallos técnicos: Errores en infraestructura podrían ocasionar retrasos.
Mitigación: Pruebas continuas y entorno seguro para detectar problemas temprano.
1.4.4	Sobrecarga de trabajo: Equipo reducido puede enfrentar exceso de tareas.
Mitigación: Priorización y sprints manejables para distribuir la carga.
1.4.5	Dependencia de tecnologías externas: Fallos en herramientas externas pueden afectar el proyecto.
Mitigación: Uso de tecnologías confiables y alternativas disponibles.

1.5	Estrategia de comunicación entre los miembros del equipo
La estrategia de comunicación del equipo se gestionará a través de la herramienta TRELLLO, que no solo permitirá la asignación y seguimiento de tareas, sino también la comunicación directa mediante los apartados de observaciones y mensajes integrados. Esto facilitará una comunicación constante entre los miembros del equipo de trabajo, permitiendo resolver dudas y hacer ajustes de manera eficiente. La herramienta asegura que todas las interacciones queden registradas, lo que contribuye a una mejor organización y alineación en cada fase del proyecto.




2.- Metodología de Desarrollo
2.1 Selección de Metodología de Desarrollo Ágil (Scrum)
Scrum fue seleccionada para el desarrollo de una PWA para la Telesecundaria 763, por su enfoque ágil y adaptabilidad a las necesidades educativas. Esta metodología organiza el trabajo en sprints cortos que permiten la entrega continua de incrementos funcionales. Cada sprint incluye planificación, ejecución, revisión y retrospectiva, garantizando un proceso iterativo y adaptable.
Scrum promueve la colaboración entre desarrolladores y el personal de la escuela, facilitando la resolución rápida de problemas. Además, permite priorizar las funcionalidades clave y adaptarse a cambios durante el desarrollo, cumpliendo con las expectativas del cliente.

Justificación:
Scrum es ideal para el desarrollo de la PWA de la Telesecundaria 763, por su enfoque estructurado y flexible. La división en sprints cortos facilita la entrega incremental y la rápida adaptación a los cambios. La metodología fomenta la transparencia y colaboración a través de reuniones diarias, asegurando que el equipo esté alineado y que los problemas se resuelvan rápidamente. La interacción continua con el cliente asegura que el producto final cumpla con sus necesidades, ofreciendo adaptabilidad, eficiencia y una comunicación clara.

2.2 Implementación de la Planificación de la metodología seleccionada.
La implementación de la planificación bajo la metodología Scrum para el desarrollo de la PWA de la Telesecundaria 763 se llevó a cabo mediante la organización del proyecto en sprints, asegurando una entrega gradual de funcionalidades. Cada sprint fue planificado en sesiones de trabajo colaborativo entre el equipo de desarrollo y los representantes de la escuela, definiendo los objetivos y las funcionalidades prioritarias a implementar.
La planificación se centró en:
1.	Definición del Product Backlog: Se creó una lista de requerimientos priorizados que incluye las funcionalidades esenciales de la PWA, considerando las necesidades del cliente y el entorno educativo.
2.	Sprint Planning: Al inicio de cada sprint, se seleccionaron las tareas del Product Backlog que serían trabajadas durante el ciclo de dos semanas. Esta planificación se basó en la capacidad del equipo y la prioridad de cada funcionalidad.
3.	Revisión y Retrospectiva: Al finalizar cada sprint, se llevará a cabo una revisión del incremento entregado y se discutirán las posibles mejoras en el proceso de trabajo, lo que garantiza una planificación continua y eficiente a lo largo del proyecto.
Esta planificación iterativa permite la flexibilidad para adaptarse a cambios y ajustes necesarios, asegurando una evolución continua del producto hasta cumplir con los objetivos del proyecto.


3.- Issue Tracking y Asignación de Issues
3.1 Selección de Herramienta para la Gestión (TRELLO)
Para la gestión eficiente del proyecto, se ha seleccionado TRELLO como la herramienta principal. Esta plataforma ofrece una amplia gama de funcionalidades que permiten organizar y controlar las tareas, establecer plazos, asignar responsabilidades y facilitar la comunicación entre los miembros del equipo. La elección de ClickUp se basa en su capacidad para gestionar proyectos ágiles como en este caso lo presenta, proporcionando una visión clara del progreso mediante sprints, así como la posibilidad de registrar observaciones y mensajes directamente dentro de cada tarea, lo que optimiza la colaboración y el seguimiento del trabajo en tiempo real.
Justificación: TRELLO permite una planificación estructurada, con calendarios y fechas de entrega bien definidas, asegurando que se cumplan los objetivos establecidos en cada fase del proyecto.

4.- Selección de Herramienta de Control de Versiones
4.1 Se ha seleccionado Git como herramienta de control de versiones en conjunto con GitHub para este proyecto. Esta combinación permite una colaboración eficiente entre los miembros del equipo, facilitando la revisión de código mediante pull requests, la creación de ramas para el desarrollo de nuevas funcionalidades y el seguimiento de cambios en tiempo real.

5.- Selección de Estrategia de Versionamiento
5.1 Utilizaremos GitHub Flow en nuestro proyecto porque nos permitirá
Mantener la estabilidad del código: La rama main siempre contendrá el código listo para producción, evitando que cambios no probados afecten la versión estable.
Desarrollar nuevas funcionalidades sin interrumpir el trabajo en producción: Las nuevas características se desarrollarán en ramas separadas, lo que nos permitirá trabajar en paralelo sin comprometer el código existente.Fácil integración y revisiones: Cada vez que se complete una funcionalidad o corrección, realizaremos un pull request para que el código sea revisado antes de ser fusionado a main, mejorando la calidad del proyecto.Respuestas rápidas a errores en producción: En caso de errores críticos, podremos crear ramas de hotfix para corregir problemas rápidamente sin afectar el desarrollo de nuevas funcionalidades.
