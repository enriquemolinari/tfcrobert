[IMAGEN_1]

**RÍO NEGRO**  
**UNIVERSIDAD NACIONAL**

**TRABAJO FINAL DE CARRERA**  
**Licenciatura en Sistemas**

**Implementación de Infraestructura Open Source para el proceso de Integración Continua y Despliegue Continuo en el Desarrollo de Software**

**Alumno:** Geoffroy Roberto Daniel, rgeoffroy@gmail.com  
**Director:** Mg. Molinari Enrique, emolinari@unrn.edu.ar  
**Co Director:** Ing. Tassara Mauricio, mtassara@unrn.edu.ar

---
**ÍNDICE**
* INTRODUCCIÓN | 2
* Motivación | 2
* Estado del Arte | 2
* Solución Propuesta | 3
* MARCO TEÓRICO | 4
* Base Conceptual sobre Contenedores y Orquestación | 4
* GitOps y la Declaratividad en Infraestructura | 5
* CI/CD: Integración Continua y Despliegue Continuo | 5
* DevOps y la Cultura de Automatización | 5
* Estrategias de Despliegue | 6
* SELECCIÓN E IMPLEMENTACIÓN DE HERRAMIENTAS | 10
* Servidor de Herramientas CI/CD | 10
* Ansible | 10
* Gitea | 11
* Docker Registry y Docker Registry UI | 11
* Jenkins | 11
* SonarQube | 11
* ArgoCD | 12
* Prometheus y Grafana | 12
* ARQUITECTURA DE LA SOLUCIÓN | 13
* IMPLEMENTACIÓN DE LA INFRAESTRUCTURA | 16
* CONFIGURACIÓN DEL ENTORNO | 18
* CONCLUSIÓN | 19
* DESAFÍOS FUTUROS | 20
* REFERENCIAS | 22
* ANEXO A | 23

---
Roberto Geoffroy - TFC: Infraestructura CI/CD Open Source - UNRN  
Página 1

# INTRODUCCIÓN

## Motivación
El despliegue de aplicaciones web ha sido tradicionalmente un proceso manual y propenso a errores, que conlleva múltiples desafíos, como la falta de consistencia entre entornos, la dependencia de la intervención humana y la dificultad para realizar cambios rápidos y seguros. Este enfoque manual genera una serie de problemas que ralentizan la capacidad de los equipos de desarrollo para responder a las necesidades de los usuarios, como:

*   **Despliegues Lentos y Susceptibles a Errores:** Cada despliegue requiere múltiples pasos manuales, lo que aumenta las probabilidades de cometer errores, comprometiendo la estabilidad de las aplicaciones.
*   **Entornos Inconsistentes:** La ausencia de automatización hace que los entornos de desarrollo, prueba y producción no siempre sean coherentes, lo que causa problemas difíciles de reproducir.
*   **Falta de Visibilidad y Control:** Los equipos de desarrollo y operaciones carecen de herramientas que brinden visibilidad sobre el estado del código y los despliegues, complicando el diagnóstico de problemas y la trazabilidad.
*   **Incapacidad para Escalar:** A medida que el número de aplicaciones crece, el enfoque manual de despliegue se vuelve insostenible, incrementando el riesgo de interrupciones del servicio.

## Estado del Arte
En los últimos años, el enfoque DevOps y la adopción de metodologías CI/CD se han consolidado como prácticas estándar en el desarrollo de software moderno. Organizaciones de todos los tamaños han comenzado a automatizar sus flujos de integración y despliegue mediante herramientas como Jenkins, GitLab CI, ArgoCD y GitHub Actions. La contenerización con Docker y la orquestación con Kubernetes se han vuelto esenciales para garantizar la escalabilidad y portabilidad de las aplicaciones.

Roberto Geoffroy - TFC: Infraestructura CI/CD Open Source - UNRN  
Página 2

Proyectos como Jenkins X y plataformas como GitLab Auto DevOps proponen soluciones integradas, aunque muchas organizaciones optan por construir arquitecturas personalizadas combinando herramientas open-source según sus necesidades.

Si bien existen múltiples soluciones comerciales para CI/CD (como CircleCI, Travis CI, GitHub Actions), las opciones open-source permiten un mayor control sobre la infraestructura y una integración más profunda con sistemas internos, especialmente en entornos on-premise o con requerimientos de soberanía tecnológica.

Este trabajo se inserta en esa línea, proponiendo una solución basada exclusivamente en herramientas open-source, alineada con los principios de GitOps y con un enfoque modular que permite escalar según las necesidades del entorno.

## Solución Propuesta
La solución a estos problemas se basa en la implementación de una infraestructura CI/CD (Integración Continua y Despliegue Continuo), basada en software open source. Este enfoque permite automatizar todas las etapas del ciclo de vida de la aplicación, desde el desarrollo hasta el despliegue en producción, reduciendo la intervención humana y minimizando errores. Las virtudes clave de este proceso son:

*   **Automatización Completa del Ciclo de Vida:** Desde que se realiza un cambio en el código hasta su despliegue en producción, el proceso es totalmente automatizado. Al integrar herramientas como Git, Jenkins, SonarQube, Docker, Docker Registry, Kubernetes y ArgoCD, se garantiza que cada cambio en el código fuente pase por pruebas, integración y validación antes de llegar a los usuarios finales. Esto asegura mayor consistencia y seguridad en los despliegues, eliminando la necesidad de intervenciones manuales y acelerando los ciclos de desarrollo.
*   **Reducción de Errores y Mayor Estabilidad:** La automatización minimiza los errores humanos, mientras que las herramientas de control de versiones y

Roberto Geoffroy - TFC: Infraestructura CI/CD Open Source - UNRN  
Página 3

validación automatizada permiten una mayor estabilidad del código desplegado. Esto disminuye significativamente el número de fallos en producción.
*   **Despliegue Ágil y Seguro:** Los pipelines de CI/CD permiten realizar despliegues en cuestión de minutos, lo que otorga una mayor agilidad a los equipos de desarrollo y operaciones. Adicionalmente, estrategias avanzadas de despliegue como blue-green deployment y canary deployment aseguran que las nuevas versiones se implementen sin interrumpir el servicio.
*   **Escalabilidad y Flexibilidad:** Esta infraestructura facilita la escalabilidad horizontal, permitiendo que múltiples aplicaciones se gestionen de forma eficiente. Herramientas como Kubernetes y ArgoCD permiten desplegar aplicaciones de manera automática en entornos distribuidos, soportando un alto volumen de tráfico sin comprometer el rendimiento.
*   **Visibilidad y Monitoreo Continuo:** La integración con herramientas como SonarQube y Prometheus proporciona un monitoreo continuo de la calidad del código, el estado de los despliegues y el rendimiento de las aplicaciones, lo que mejora la visibilidad y el control del equipo sobre los procesos en tiempo real.

# MARCO TEÓRICO
A continuación, se presenta el marco conceptual que fundamenta el diseño e implementación de la infraestructura propuesta, estableciendo las bases teóricas sobre las cuales se sustenta cada componente de la solución.

## Base Conceptual sobre Contenedores y Orquestación
Dado que los fundamentos de contenedores y su orquestación fueron desarrollados en detalle en la PPS (Geoffroy e Iturburu, 2025), en esta sección se parte de dichos conocimientos como base conceptual.

Roberto Geoffroy - TFC: Infraestructura CI/CD Open Source - UNRN  
Página 4

## GitOps y la Declaratividad en Infraestructura
GitOps es un enfoque que aplica principios de Git al despliegue y gestión de infraestructura. En este modelo, el estado deseado de los entornos se define en archivos versionados dentro de repositorios, lo que asegura trazabilidad, auditabilidad y control. Cada cambio en el repositorio desencadena procesos automatizados que actualizan la infraestructura para reflejar el nuevo estado definido.

Este enfoque no solo mejora la consistencia y confiabilidad de los despliegues, sino que también promueve la colaboración al integrar las mejores prácticas de control de versiones en la gestión de infraestructura.

## CI/CD: Integración Continua y Despliegue Continuo
La práctica de CI/CD (Integración Continua y Despliegue Continuo) es fundamental para automatizar el ciclo de vida del desarrollo de software, desde la integración del código hasta su despliegue.

La Integración Continua (CI) promueve que los desarrolladores integren cambios de código en un repositorio central de manera frecuente. Cada integración desencadena procesos automatizados que incluyen compilaciones y pruebas, permitiendo identificar errores de forma temprana y reducir conflictos en el código. Este enfoque mejora la calidad del software al acelerar la validación de cambios.

La Entrega Continua (CD) extiende este proceso asegurando que los cambios validados estén siempre listos para ser desplegados. La Implementación Continua, por su parte, automatiza por completo el despliegue a entornos de producción o preproducción, eliminando la necesidad de aprobaciones manuales y garantizando una entrega rápida y segura.

## DevOps y la Cultura de Automatización
El enfoque DevOps es una filosofía que busca integrar los equipos de desarrollo y operaciones para mejorar la colaboración, reducir los tiempos de entrega y optimizar

Roberto Geoffroy - TFC: Infraestructura CI/CD Open Source - UNRN  
Página 5

la calidad del software. DevOps se apoya en prácticas como la automatización de pipelines, el uso de contenedores y la integración de herramientas que facilitan la colaboración entre equipos.

Conceptos fundamentales en esta filosofía incluyen:
*   **Pipelines:** Flujos de trabajo automatizados que definen las etapas por las que pasa el código, desde la integración hasta el despliegue.
*   **Jobs:** Tareas específicas dentro de un pipeline, como compilaciones, pruebas o análisis de calidad.
*   **Estrategias de Despliegue:** Métodos como blue-green y canary deployment, que minimizan riesgos y aseguran transiciones controladas al implementar nuevas versiones.

El objetivo de DevOps es crear un ciclo de desarrollo más ágil, con entregas frecuentes y alineadas con las necesidades del usuario final, apoyándose en la automatización y la colaboración continua.

## Estrategias de Despliegue
Para asegurar que las implementaciones en producción sean seguras y con mínimas interrupciones, existen diversas estrategias de despliegue que se alinean con los principios de CI/CD. Entre las más utilizadas se encuentran:

*   **Blue-Green Deployment:** Consiste en mantener dos entornos separados, uno activo (blue) y otro inactivo (green). El nuevo código se despliega en el entorno inactivo, donde se realizan pruebas. Una vez validado, el tráfico se redirige al entorno actualizado, manteniendo el entorno anterior como respaldo.
*   **Canary Deployment:** Introduce una nueva versión de la aplicación de manera gradual a un subconjunto de usuarios. Esto permite monitorear el comportamiento del sistema en condiciones reales y mitigar riesgos antes de realizar un despliegue completo.

Roberto Geoffroy - TFC: Infraestructura CI/CD Open Source - UNRN  
Página 6

Ambas estrategias permiten una transición controlada entre versiones, garantizando una experiencia confiable para los usuarios finales.

El marco teórico presentado abarca conceptos fundamentales en la entrega moderna de software, desde la contenerización y la orquestación de aplicaciones hasta las prácticas de DevOps y CI/CD. Estas metodologías, combinadas con enfoques como GitOps y estrategias avanzadas de despliegue, forman la base para crear sistemas resilientes, escalables y alineados con las necesidades de los usuarios. Al aplicar estos principios se promueve la automatización, la eficiencia y la calidad en los procesos de desarrollo y operaciones.

Roberto Geoffroy - TFC: Infraestructura CI/CD Open Source - UNRN  
Página 7

[IMAGEN_2]  
Imagen 1. Deployment Blue / Green. Imagen propia realizada con Draw.io  
Para este y todos los diagramas siguientes la herramienta utilizada es Draw.io. https://app.diagrams.net/

Roberto Geoffroy - TFC: Infraestructura CI/CD Open Source - UNRN  
Página 8

[IMAGEN_3]  
Imagen 2. Deployment Canary. Imagen propia realizada con Draw.io

[IMAGEN_4]  
Imagen 3. Deployment Mixto Canary - Blue / Green. Imagen propia realizada con Draw.io

Roberto Geoffroy - TFC: Infraestructura CI/CD Open Source - UNRN  
Página 9

# SELECCIÓN E IMPLEMENTACIÓN DE HERRAMIENTAS
En función del marco conceptual desarrollado, se identificaron y seleccionaron herramientas open-source que permitieran materializar una solución CI/CD robusta, escalable y alineada con los principios de automatización del desarrollo y despliegue de software. Cada herramienta cumple un rol específico dentro del ciclo de vida del software, contribuyendo a optimizar procesos como la integración, validación, entrega y monitoreo continuo.

A excepción del clúster de Kubernetes, todas las herramientas fueron desplegadas en una máquina virtual mediante contenedores Docker. Esta estrategia permitió construir un entorno aislado, homogéneo y fácilmente replicable, lo que simplifica su administración y mejora la escalabilidad. Para automatizar la instalación y configuración de los servicios involucrados, se utilizó Ansible, herramienta que facilita la gestión declarativa a través de playbooks, asegurando despliegues rápidos, reproducibles y consistentes.

## Servidor de Herramientas CI/CD
La infraestructura central reside en una máquina virtual que actúa como servidor principal de todas las herramientas de CI/CD. Este enfoque permite escalar los recursos según la demanda, garantizar el aislamiento del entorno de desarrollo y despliegue, y aprovechar las ventajas de los backups y snapshots de las máquinas virtuales para recuperación rápida en caso de fallos.

## Ansible
Para la automatización y configuración de los servicios desplegados en contenedores Docker, Ansible se emplea como herramienta de automatización, facilitando la instalación, configuración y despliegue de cada componente mediante playbooks YAML. Este proceso automatizado asegura consistencia en la configuración de los servicios y optimiza el tiempo de despliegue al ejecutar los pasos necesarios en serie y sin intervención manual.

Roberto Geoffroy - TFC: Infraestructura CI/CD Open Source - UNRN  
Página 10

## Gitea
Gitea proporciona un sistema de control de versiones eficiente y ligero compatible con Git. La integración mediante webhooks permite que, tras cada cambio en el repositorio, se active automáticamente el pipeline de CI/CD en Jenkins, permitiendo la automatización completa desde el control de versiones hasta el despliegue. (ver Figura A.1 en Anexo A).

## Docker Registry y Docker Registry UI
Docker Registry actúa como repositorio central para las imágenes de contenedores, gestionadas a través de Docker Registry UI. Esta interfaz permite a los desarrolladores administrar visualmente las imágenes, ofreciendo control sobre las versiones y asegurando que cada build esté disponible para su despliegue en producción.

## Jenkins
Jenkins facilita la ejecución de pipelines CI/CD, gestionando cada fase del desarrollo, desde la construcción hasta las pruebas y el despliegue. Con su ecosistema de plugins, Jenkins permite integraciones avanzadas con Gitea, SonarQube, Docker y Kubernetes, automatizando cada paso del ciclo de vida de la aplicación. (ver Figura A.2 en Anexo A)

## SonarQube
SonarQube permite realizar análisis de calidad del código de manera continua. Al integrarse con Jenkins, SonarQube asegura que cada cambio pase por un proceso de validación de calidad, ayudando a detectar vulnerabilidades y errores y permitiendo mantener un estándar de calidad en el código. (ver Figura A.3 en Anexo A)

Roberto Geoffroy - TFC: Infraestructura CI/CD Open Source - UNRN  
Página 11

## ArgoCD
Desplegado dentro del clúster de Kubernetes, facilita el despliegue continuo de aplicaciones siguiendo el enfoque GitOps. Este sistema monitorea continuamente los repositorios Git en busca de cambios en los manifiestos de infraestructura, sincronizando de manera automática el estado deseado definido en Git con el estado actual del clúster. Esta metodología asegura la consistencia de las aplicaciones y elimina la necesidad de configuraciones manuales, simplificando la gestión y reduciendo errores humanos en los entornos de Kubernetes. (ver Figura A.4 en Anexo A)

## Prometheus y Grafana
Prometheus fue desplegado en el clúster de Kubernetes como sistema principal para la recolección y almacenamiento de métricas, tanto de las aplicaciones implementadas como del propio clúster. Diseñado específicamente para tareas de monitoreo y generación de alertas, permite recopilar datos en tiempo real y definir reglas para la detección de anomalías o fallos en los servicios.

Grafana, también implementado dentro del clúster, se encarga de la visualización de estas métricas. Gracias a su integración nativa con Prometheus como fuente de datos, ofrece dashboards personalizados que facilitan el análisis del estado general del sistema y sus aplicaciones. Asimismo, fue configurado para enviar notificaciones por correo electrónico cuando se superan los umbrales definidos, permitiendo una respuesta rápida ante eventos críticos.

Una vez completado el despliegue de las herramientas, se procedió al diseño de la infraestructura con el objetivo de integrarlas en una arquitectura coherente y eficiente. Dicho diseño contempló la distribución lógica de los servicios, la orquestación de los procesos y la escalabilidad del entorno CI/CD propuesto. (ver Figura A.6 en Anexo A)

Roberto Geoffroy - TFC: Infraestructura CI/CD Open Source - UNRN  
Página 12

# ARQUITECTURA DE LA SOLUCIÓN
El diseño de la infraestructura se centró en integrar eficazmente las herramientas seleccionadas dentro de un entorno controlado, reproducible y escalable. Para lograrlo, se definió una arquitectura híbrida compuesta por una máquina virtual -encargada de alojar los servicios principales del pipeline CI/CD mediante contenedores Docker- y un clúster de Kubernetes -dedicado a la ejecución de las aplicaciones desplegadas-. Esta separación funcional permite aislar los componentes de infraestructura del entorno de ejecución, favoreciendo la seguridad, la mantenibilidad y la escalabilidad del sistema.

El flujo de trabajo comienza cuando un desarrollador realiza cambios en el código y los envía al repositorio Git alojado en Gitea. Este repositorio, gestionado dentro de un contenedor, emite automáticamente una notificación a Jenkins a través de un webhook, activando así el pipeline de CI/CD sin necesidad de intervención manual.

Una vez iniciado, Jenkins descarga el código actualizado y lo somete a un análisis de calidad utilizando SonarQube. Si el análisis resulta satisfactorio, el pipeline continúa con la compilación del código y la generación de una imagen Docker, la cual es almacenada en el Docker Registry con una etiqueta identificatoria basada en el número de build. Esta práctica facilita el control de versiones y la trazabilidad de los artefactos generados.

Posteriormente, Jenkins actualiza los manifiestos de infraestructura en un repositorio Git dedicado, reflejando la nueva versión de la imagen. ArgoCD, configurado bajo el enfoque GitOps, detecta automáticamente estos cambios y sincroniza el clúster de Kubernetes para desplegar la versión actualizada de la aplicación. Este proceso garantiza un despliegue coherente, automático y alineado con el estado declarado en los repositorios, reduciendo la posibilidad de errores manuales y mejorando la confiabilidad general del sistema.

Roberto Geoffroy - TFC: Infraestructura CI/CD Open Source - UNRN  
Página 13

[IMAGEN_5]  
Imagen 4. Imagen propia realizada con Draw.io

[IMAGEN_6]  
Imagen 5. Diagrama de la Infraestructura. Imagen propia realizada con Draw.io

Roberto Geoffroy - TFC: Infraestructura CI/CD Open Source - UNRN  
Página 14

[IMAGEN_7]  
Imagen 6. Diagrama de secuencia. Imagen propia realizada con Draw.io

Roberto Geoffroy - TFC: Infraestructura CI/CD Open Source - UNRN  
Página 15

# IMPLEMENTACIÓN DE LA INFRAESTRUCTURA
Para garantizar un rendimiento eficiente y estable de la infraestructura CI/CD, se han definido una serie de requerimientos mínimos fundamentados en la documentación técnica de las herramientas involucradas. Estos requerimientos permiten operar de forma óptima en entornos pequeños o medianos, ofreciendo la flexibilidad necesaria para escalar según las necesidades del proyecto.

La capacidad de procesamiento recomendada para la máquina virtual incluye al menos cuatro núcleos de CPU (vCPUs). Este nivel de procesamiento es adecuado para soportar herramientas como Jenkins y SonarQube, que son intensivas en el uso de recursos, especialmente durante la ejecución de builds y análisis de código. Los cuatro núcleos permiten manejar simultáneamente tareas críticas como compilaciones, pruebas y validaciones de código, asegurando un flujo continuo sin interrupciones significativas.

En términos de memoria RAM, se considera necesario un mínimo de 16 GB para garantizar la estabilidad del sistema, especialmente cuando se manejan múltiples builds concurrentes o proyectos de gran tamaño. Aunque las configuraciones básicas de herramientas como Jenkins y SonarQube podrían operar con 8 GB, se ha optado por esta capacidad ampliada para cubrir escenarios más exigentes y asegurar un desempeño óptimo incluso al utilizar plugins adicionales o análisis avanzados.

El almacenamiento también juega un papel crucial en la infraestructura. Se estima que 200 GB son suficientes para manejar los volúmenes generados por herramientas como Docker y Jenkins, incluyendo imágenes de contenedor, artefactos de builds y logs. Para maximizar la eficiencia, se recomienda el uso de discos SSD, que proporcionan tiempos de lectura y escritura significativamente más rápidos, lo cual es esencial durante las fases de compilación y despliegue.

Asimismo, la conectividad de red debe garantizar una transferencia fluida de grandes volúmenes de datos, como código fuente, dependencias y artefactos. Una conexión de al menos 1 Gbps asegura que estas operaciones no sufran retrasos significativos, contribuyendo a la eficiencia global de los pipelines CI/CD.

Roberto Geoffroy - TFC: Infraestructura CI/CD Open Source - UNRN  
Página 16

Finalmente, el sistema operativo propuesto para esta infraestructura es Linux, específicamente distribuciones como Ubuntu 22.04 o CentOS 7 o superiores. Estas plataformas son ampliamente reconocidas por su estabilidad, compatibilidad y optimización para herramientas open-source, asegurando un entorno robusto y confiable para la operación de contenedores y aplicaciones de CI/CD.

Estos requerimientos mínimos han sido definidos para garantizar un equilibrio entre rendimiento, estabilidad y capacidad de adaptación a diferentes escenarios, permitiendo que la infraestructura responda de manera efectiva a las demandas actuales y futuras del proyecto.

Roberto Geoffroy - TFC: Infraestructura CI/CD Open Source - UNRN  
Página 17

# CONFIGURACIÓN DEL ENTORNO
Una vez desplegadas todas las herramientas en la máquina virtual, es necesario realizar una configuración inicial para garantizar su correcto funcionamiento y adaptarlas a las necesidades del proyecto. Estas configuraciones son esenciales para establecer parámetros básicos, definir roles de usuario y asegurar una integración fluida entre los distintos componentes de la infraestructura.

Durante el primer inicio de sesión de cada herramienta, se recomienda configurar un usuario administrador con las credenciales adecuadas para gestionar el sistema de manera centralizada. Este paso es crítico para garantizar la seguridad y el control sobre las configuraciones posteriores. Además, es importante personalizar nombres y descripciones de los sistemas, como el título del dashboard en Jenkins o el nombre del repositorio principal en Gitea, para facilitar su identificación dentro del equipo.

En esta etapa, también se debe verificar la integración entre las herramientas, como la configuración de webhooks en Gitea para notificar a Jenkins sobre cambios en el repositorio, o la conexión entre SonarQube y los proyectos que serán analizados. Estas integraciones aseguran que el flujo de trabajo se automatice correctamente desde el inicio.

Por último, aunque las herramientas suelen venir con configuraciones predeterminadas, es recomendable ajustar parámetros adicionales según las necesidades del entorno, como el idioma del sistema, las políticas de retención de logs o los límites de uso de recursos. Estas configuraciones personalizadas ayudan a optimizar el rendimiento y mejorar la experiencia de los usuarios.

En conjunto, esta etapa de configuración inicial permite que cada herramienta funcione de manera armoniosa dentro de la infraestructura, sentando las bases para una operación estable y eficiente.

Roberto Geoffroy - TFC: Infraestructura CI/CD Open Source - UNRN  
Página 18

# CONCLUSIÓN
La implementación de esta solución ha permitido transformar los procesos de desarrollo y despliegue de software, estableciendo una infraestructura moderna, eficiente y alineada con las mejores prácticas actuales. Al integrar herramientas open-source y metodologías como CI/CD y GitOps, se han optimizado las operaciones, reduciendo tiempos y errores, mientras se garantiza una alta disponibilidad y estabilidad de los sistemas.

Además, la automatización y el monitoreo continuo han mejorado significativamente la visibilidad sobre los entornos y aplicaciones, permitiendo al equipo responder de manera proactiva ante posibles incidentes. Este enfoque no solo ha resuelto desafíos técnicos, sino que también ha sentado las bases para una infraestructura escalable y adaptable, preparada para enfrentar las demandas futuras del proyecto y del entorno tecnológico en constante evolución.

Esta solución representa un avance significativo hacia una operación más ágil, robusta y centrada en la calidad del software entregado.

Roberto Geoffroy - TFC: Infraestructura CI/CD Open Source - UNRN  
Página 19

# DESAFÍOS FUTUROS
En la búsqueda de mejorar y escalar la infraestructura actual, se identifican varios desafíos y oportunidades de mejora que pueden ser abordados en el futuro:

*   **Implementación de un Ingress Avanzado en Kubernetes:** Aunque el ingress actual cumple con los requisitos básicos de enrutamiento, se plantea como desafío adoptar una solución más avanzada que permita realizar balanceo de carga basado en patrones adicionales, como la latencia, la disponibilidad del servicio o incluso la localización geográfica de los usuarios. Este cambio podría incrementar la complejidad de la configuración, pero ofrecería una mayor flexibilidad y control sobre el tráfico dirigido a las aplicaciones.
*   **Integración de Keycloak para SSO:** Unificar la autenticación de todas las herramientas utilizadas mediante un sistema de Single Sign-On (SSO), como Keycloak, es un paso clave para simplificar la gestión de usuarios y aumentar la seguridad. Keycloak permitiría centralizar el acceso, implement políticas de autenticación robustas y facilitar la experiencia de los usuarios al reducir la necesidad de múltiples credenciales.
*   **Centralización de Logs:** La implementación de un sistema centralizado de gestión de logs permitiría consolidar y analizar los registros generados por las diversas herramientas y aplicaciones de la infraestructura. Soluciones como ELK Stack (Elasticsearch, Logstash y Kibana) o Grafana Loki pueden facilitar la detección de errores, la auditoría y el monitoreo en tiempo real, optimizando la capacidad de respuesta ante problemas.
*   **Notificaciones en Tiempo Real:** La integración de un sistema de notificaciones en tiempo real, como Rocket.Chat, para alertar sobre problemas en los despliegues o el funcionamiento de las aplicaciones, incrementaría significativamente la capacidad del equipo para reaccionar de manera oportuna ante incidentes. Este sistema podría configurarse para enviar alertas basadas en eventos críticos, como fallos en pipelines de CI/CD, caídas de servicios o cambios en el estado de la infraestructura.

Roberto Geoffroy - TFC: Infraestructura CI/CD Open Source - UNRN  
Página 20

Otro desafío futuro clave será instruir a los desarrolladores para que puedan auto provisionar infraestructura de manera autónoma, aprovechando que esta se encuentra definida como código. Este enfoque no solo fomenta la colaboración entre los equipos de desarrollo y operaciones, sino que también empodera a los desarrolladores para gestionar sus propios entornos según las necesidades específicas de sus proyectos, sin depender directamente del equipo DevOps. La capacitación incluiría el uso de herramientas de infraestructura como código, la comprensión de los manifiestos y pipelines existentes, y las mejores prácticas para realizar cambios seguros y eficientes. Esto reducirá los cuellos de botella y permitirá una mayor agilidad en el ciclo de vida de desarrollo, al tiempo que mantiene la consististencia y el control centralizado sobre los entornos.

Estos desafíos representan pasos importantes para fortalecer la infraestructura y alinearla con los estándares modernos de gestión y monitoreo. Aunque su implementación requiere un análisis cuidadoso y planificación, los beneficios en términos de escalabilidad, seguridad y capacidad de respuesta son significativos, posicionando el sistema para afrontar con éxito las demandas futuras.

Roberto Geoffroy - TFC: Infraestructura CI/CD Open Source - UNRN  
Página 21

# REFERENCIAS
Oliva, J (2025). *Integración de Jenkins Sonarqube Devsecops*  
Aravind Avy (2023). *How to Build a CI/CD Pipeline with Jenkins and Kubernetes?*  
Dileep Prithvi (2020). *Jenkins Integration with Kubernetes Plugin*  
Gcore (2023). *How to Set Up Jenkins on Kubernetes*  
Rafael Marquez (2019). *Evalúa la calidad de tu código con Sonarqube*  
Sangha (2023). *Private Docker Registry with HTTPS and a Nginx reverse proxy using Docker Compose*  
Saicharanteja Usa (2023). *Ci-Cd Pipeline Jenkins And Argocd To Deploy An App*  
Miiro Juuso (2020). *Building your first Docker image with Jenkins 2*  
Alberto Coronado (2024). *GitOps y CD (Dontinuous Deployment) con ArgoCD*  
Geoffroy, R. (2025). *Práctica Pre Profesional Supervisada: Despliegue de PdfBook sobre Kubernetes en el Poder Judicial de Río Negro* [Trabajo no publicado]. Universidad Nacional de Río Negro.

Roberto Geoffroy - TFC: Infraestructura CI/CD Open Source - UNRN  
Página 22

# ANEXO A

[IMAGEN_8]  
Figura A.1: Vista del repositorio GitOps (unrn-tfc-test-infra) en Gitea, mostrando los manifiestos de Kubernetes para el despliegue de la aplicación de ejemplo y la estructura declarativa de la infraestructura.

Roberto Geoffroy - TFC: Infraestructura CI/CD Open Source - UNRN  
Página 23

[IMAGEN_9]  
Figura A.2: Vista de la etapa de un pipeline CI/CD en Jenkins, mostrando los pasos de despliegue Blue-Green (deploy-unrn-tfc-test-green-blue) y su duración promedio.

Roberto Geoffroy - TFC: Infraestructura CI/CD Open Source - UNRN  
Página 24

[IMAGEN_10]  
Figura A.3: Dashboard de SonarQube para el proyecto unrn-tfc-test, mostrando los resultados de un análisis de calidad de código. Se visualizan métricas clave como la cantidad de bugs, vulnerabilidades, hotspots de seguridad y deuda técnica, así como el estado del Quality Gate (Passed), lo que garantiza que el código cumple con los estándares definidos antes de continuar en el pipeline CI/CD.

Roberto Geoffroy - TFC: Infraestructura CI/CD Open Source - UNRN  
Página 25

[IMAGEN_11]  
Figura A.4: Dashboard de ArgoCD mostrando el estado Healthy y Synced de la aplicación unrn-tfc-test, desplegada en el clúster de Kubernetes. Esta vista detalla la topología de los recursos de la aplicación (pods, services, ingress) y confirma que el estado actual del clúster coincide con el estado deseado definido en el repositorio GitOps, lo que asegura la consistencia y la automatización del despliegue continuo.

Roberto Geoffroy - TFC: Infraestructura CI/CD Open Source - UNRN  
Página 26

[IMAGEN_12]  
Figura A.5: Interfaz de usuario de Lens, mostrando los pods activos en el namespace app-test-green dentro del clúster de Kubernetes. En la parte inferior, se visualizan los logs en tiempo real de uno de los pods seleccionados, proporcionando detalles sobre su estado operativo y mensajes del servidor Apache. Esta herramienta es fundamental para el monitoreo en tiempo real, la depuración y la resolución de problemas en un entorno de despliegue continuo.

Roberto Geoffroy - TFC: Infraestructura CI/CD Open Source - UNRN  
Página 27

[IMAGEN_13]  
Figura A.6: Dashboard de Grafana diseñado para el monitoreo del servidor Apache, mostrando métricas de rendimiento específicas. Se visualizan datos clave relacionados con el tráfico web, como el número de peticiones HTTP, conexiones activas y latencia del servidor Apache, lo que permite información detallada del comportamiento y la salud de la aplicación.

Roberto Geoffroy - TFC: Infraestructura CI/CD Open Source - UNRN  
Página 28