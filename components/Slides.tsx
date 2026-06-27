import React from 'react';
import { SlideProps } from '../types';

const baseImagePath = `${import.meta.env.BASE_URL || '/'}imagenes`;

type SectionCardProps = {
  title: string;
  points: string[];
};

const SectionCard: React.FC<SectionCardProps> = ({ title, points }) => (
  <section className="bg-card-bg/70 border border-slate-700 rounded-2xl p-6">
    <h3 className="text-xl md:text-2xl font-bold mb-4 text-slate-100">{title}</h3>
    <ul className="space-y-2 text-slate-300 text-lg leading-snug">
      {points.map((point) => (
        <li key={point} className="flex gap-3">
          <span className="text-unrn-red font-black">-</span>
          <span>{point}</span>
        </li>
      ))}
    </ul>
  </section>
);

export const TitleSlide: React.FC<SlideProps> = () => (
  <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center animate-fade-in">
    <div className="space-y-6">
      <p className="uppercase tracking-[0.3em] text-sm text-slate-400">Universidad Nacional de Río Negro</p>
      <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white">
        Implementación de Infraestructura Open Source para CI/CD
      </h1>
      <p className="text-xl text-slate-300">
        Trabajo Final de Carrera - Licenciatura en Sistemas
      </p>
      <div className="text-slate-400 leading-relaxed">
        <p>Alumno: Geoffroy Roberto Daniel</p>
        <p>Director: Mg. Molinari Enrique</p>
        <p>Co Director: Ing. Tassara Mauricio</p>
      </div>
    </div>

    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full max-w-xl bg-slate-900/60 border border-slate-700 rounded-2xl p-4 shadow-2xl">
        <img
          src={`${baseImagePath}/logo_cicd.png`}
          alt="Logo CI CD"
          className="w-full h-auto max-h-[68vh] rounded-xl object-contain"
        />
      </div>
    </div>
  </div>
);

export const AgendaSlide: React.FC<SlideProps> = () => (
  <div className="w-full max-w-6xl animate-slide-up">
    <h2 className="text-5xl font-bold mb-10 text-white">Índice</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xl text-slate-200">
      {[
        'Introducción: motivación y estado del arte',
        'Solución propuesta y beneficios',
        'Marco teórico: GitOps, CI/CD, DevOps',
        'Estrategias de despliegue',
        'Selección de herramientas open source',
        'Arquitectura de la solución',
        'Implementación de la infraestructura',
        'Configuración del entorno',
        'Conclusión y desafíos futuros'
      ].map((item, index) => (
        <div key={item} className="bg-card-bg/60 border border-slate-700 rounded-xl px-5 py-4">
          <span className="text-unrn-red font-bold mr-2">{index + 1}.</span>
          {item}
        </div>
      ))}
    </div>
  </div>
);

export const IntroSlide: React.FC<SlideProps> = () => (
  <div className="w-full max-w-7xl space-y-6 animate-fade-in">
    <h2 className="text-5xl font-bold text-white">Introducción</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SectionCard
        title="Motivación"
        points={[
          'Despliegues manuales lentos y con errores',
          'Entornos inconsistentes entre desarrollo, pruebas y producción',
          'Baja visibilidad sobre código y despliegues',
          'Dificultad para escalar sin automatización'
        ]}
      />
      <SectionCard
        title="Estado del Arte"
        points={[
          'DevOps y CI/CD como práctica estándar',
          'Docker y Kubernetes para portabilidad y escalabilidad',
          'Herramientas integradas: Jenkins, ArgoCD, GitHub Actions',
          'Open source para control total e integración on-premise'
        ]}
      />
    </div>
  </div>
);

export const SolutionSlide: React.FC<SlideProps> = () => (
  <div className="w-full max-w-7xl animate-slide-up space-y-6">
    <h2 className="text-5xl font-bold text-white">Solución Propuesta</h2>
    <SectionCard
      title="Infraestructura CI/CD Open Source"
      points={[
        'Automatización completa: commit hasta producción',
        'Reducción de errores humanos y mayor estabilidad',
        'Despliegues ágiles con estrategias seguras',
        'Escalabilidad horizontal con Kubernetes y GitOps',
        'Monitoreo y trazabilidad continua del proceso'
      ]}
    />
  </div>
);

export const TheorySlide: React.FC<SlideProps> = () => (
  <div className="w-full max-w-7xl animate-fade-in space-y-6">
    <h2 className="text-5xl font-bold text-white">Marco Teórico</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SectionCard
        title="Conceptos Base"
        points={[
          'Contenedores y orquestación como base operativa',
          'GitOps: estado deseado versionado en Git',
          'CI para validar cambios tempranamente',
          'CD para entrega y despliegue continuo'
        ]}
      />
      <SectionCard
        title="Cultura DevOps"
        points={[
          'Colaboración entre desarrollo y operaciones',
          'Pipelines y jobs automatizados',
          'Calidad, velocidad y repetibilidad',
          'Entrega frecuente alineada con necesidades del usuario'
        ]}
      />
    </div>
  </div>
);

export const StrategySlide: React.FC<SlideProps> = () => (
  <div className="w-full max-w-7xl animate-slide-up space-y-6">
    <h2 className="text-5xl font-bold text-white">Estrategias de Despliegue</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SectionCard
        title="Blue Green"
        points={[
          'Dos entornos: activo e inactivo',
          'Pruebas en entorno inactivo',
          'Cambio de tráfico al validar',
          'Rollback rápido al entorno previo',
          '[IMAGEN_2]'
        ]}
      />
      <SectionCard
        title="Canary y Mixto"
        points={[
          'Canary: liberación gradual a subset de usuarios',
          'Monitoreo en condiciones reales antes de despliegue total',
          'Mixto: combina canary con blue green para más control',
          '[IMAGEN_3]',
          '[IMAGEN_4]'
        ]}
      />
    </div>
  </div>
);

export const ToolsSlide: React.FC<SlideProps> = () => (
  <div className="w-full max-w-7xl animate-fade-in space-y-6">
    <h2 className="text-5xl font-bold text-white">Herramientas Seleccionadas</h2>
    <SectionCard
      title="Stack Open Source"
      points={[
        'Servidor central en máquina virtual',
        'Ansible para instalación y configuración declarativa',
        'Gitea para repositorios y webhooks',
        'Jenkins para pipeline CI/CD',
        'SonarQube para calidad de código',
        'Docker Registry para imágenes',
        'ArgoCD para despliegue GitOps',
        'Prometheus y Grafana para monitoreo y alertas'
      ]}
    />
  </div>
);

export const ArchitectureSlide: React.FC<SlideProps> = () => (
  <div className="w-full max-w-7xl animate-slide-up space-y-6">
    <h2 className="text-5xl font-bold text-white">Arquitectura de la Solución</h2>
    <SectionCard
      title="Flujo Automatizado"
      points={[
        '1. Commit en Gitea activa webhook hacia Jenkins',
        '2. Jenkins ejecuta build y análisis con SonarQube',
        '3. Jenkins genera imagen y publica en Registry',
        '4. Jenkins actualiza manifiestos en repositorio Git',
        '5. ArgoCD sincroniza Kubernetes según estado declarado',
        '[IMAGEN_5]',
        '[IMAGEN_6]',
        '[IMAGEN_7]'
      ]}
    />
  </div>
);

export const ImplementationSlide: React.FC<SlideProps> = () => (
  <div className="w-full max-w-7xl animate-fade-in space-y-6">
    <h2 className="text-5xl font-bold text-white">Implementación de Infraestructura</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SectionCard
        title="Requerimientos Mínimos"
        points={[
          'CPU: 4 vCPU para builds y análisis concurrentes',
          'RAM: 16 GB para estabilidad con cargas medias',
          'Storage: 200 GB en SSD para imágenes y artefactos',
          'Red: 1 Gbps para transferencia fluida de artefactos'
        ]}
      />
      <SectionCard
        title="Base Operativa"
        points={[
          'Sistema operativo Linux (Ubuntu 22.04 o superior)',
          'Entorno replicable, aislado y escalable',
          'Balance entre rendimiento y flexibilidad',
          'Preparado para crecimiento futuro del proyecto'
        ]}
      />
    </div>
  </div>
);

export const ConfigSlide: React.FC<SlideProps> = () => (
  <div className="w-full max-w-7xl animate-slide-up space-y-6">
    <h2 className="text-5xl font-bold text-white">Configuración del Entorno</h2>
    <SectionCard
      title="Puesta en Marcha"
      points={[
        'Configuración inicial de usuario administrador por herramienta',
        'Ajuste de nombres, dashboards y repositorios principales',
        'Verificación de integraciones: webhooks y conexiones internas',
        'Personalización de idioma, retención de logs y límites de recursos',
        'Operación armónica entre componentes de la infraestructura'
      ]}
    />
  </div>
);

export const ConclusionSlide: React.FC<SlideProps> = () => (
  <div className="w-full max-w-7xl animate-fade-in space-y-6">
    <h2 className="text-5xl font-bold text-white">Conclusión</h2>
    <SectionCard
      title="Resultados"
      points={[
        'Se transformó el proceso de desarrollo y despliegue',
        'Se redujeron tiempos operativos y errores manuales',
        'Se logró mayor visibilidad y respuesta proactiva ante incidentes',
        'La solución queda lista para escalar y adaptarse al futuro'
      ]}
    />
  </div>
);

export const FutureSlide: React.FC<SlideProps> = () => (
  <div className="w-full max-w-7xl animate-slide-up space-y-6">
    <h2 className="text-5xl font-bold text-white">Desafíos Futuros</h2>
    <SectionCard
      title="Próximos Pasos"
      points={[
        'Extender la plataforma a más proyectos y equipos',
        'Fortalecer seguridad y políticas de gobernanza DevSecOps',
        'Mejorar observabilidad con tableros por dominio',
        'Optimizar costos y tiempos de pipeline con escalado inteligente'
      ]}
    />
  </div>
);

export const AnnexSlide: React.FC<SlideProps> = () => (
  <div className="w-full max-w-7xl animate-fade-in space-y-6">
    <h2 className="text-5xl font-bold text-white">Anexo A</h2>
    <SectionCard
      title="Marcadores de Imagen"
      points={[
        '[IMAGEN_8] Repositorio GitOps en Gitea',
        '[IMAGEN_9] Pipeline en Jenkins (Blue Green)',
        '[IMAGEN_10] Dashboard de calidad en SonarQube',
        '[IMAGEN_11] Estado de aplicación en ArgoCD',
        '[IMAGEN_12] Pods y logs en Lens',
        '[IMAGEN_13] Dashboard de monitoreo en Grafana'
      ]}
    />
  </div>
);

export const EndSlide: React.FC<SlideProps> = () => (
  <div className="w-full h-full flex flex-col items-center justify-center text-center animate-fade-in">
    <h2 className="text-6xl font-black text-white mb-6">Gracias</h2>
    <p className="text-2xl text-slate-300">Preguntas</p>
    <p className="text-slate-500 mt-6">Roberto Geoffroy - UNRN</p>
  </div>
);
