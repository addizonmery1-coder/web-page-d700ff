/**
 * Contenido informativo de Adolever.
 * Basado en información pública de la OMS, el UNFPA y el Minsa (Perú).
 * Las cifras de eficacia corresponden al "uso típico" publicado por la OMS.
 */

export type CyclePhase = {
  id: 'menstrual' | 'folicular' | 'ovulacion' | 'lutea'
  name: string
  days: string
  start: number // día aproximado de inicio (ciclo de 28 días)
  end: number
  summary: string
  body: string
  tip: string
}

export const phases: CyclePhase[] = [
  {
    id: 'menstrual',
    name: 'Fase menstrual',
    days: 'Días 1 a 5 aprox.',
    start: 1,
    end: 5,
    summary: 'Empieza tu periodo.',
    body: 'El útero libera la capa interna que preparó el mes anterior y sale como sangrado. Suele durar entre 3 y 7 días.',
    tip: 'Descansa si lo necesitas, hidrátate y usa calor suave si tienes cólicos.',
  },
  {
    id: 'folicular',
    name: 'Fase folicular',
    days: 'Días 1 a 13 aprox.',
    start: 1,
    end: 13,
    summary: 'Tu cuerpo se prepara.',
    body: 'Los ovarios hacen madurar un óvulo y sube el estrógeno. Muchas personas sienten más energía en estos días.',
    tip: 'Buen momento para moverte, hacer deporte y planificar.',
  },
  {
    id: 'ovulacion',
    name: 'Ovulación',
    days: 'Alrededor del día 14',
    start: 13,
    end: 15,
    summary: 'Se libera un óvulo.',
    body: 'Un ovario libera un óvulo que vive unas 24 horas. Es el momento de mayor probabilidad de embarazo si hay relaciones sin protección.',
    tip: 'Puede aparecer un flujo transparente y elástico: es normal.',
  },
  {
    id: 'lutea',
    name: 'Fase lútea',
    days: 'Días 15 a 28 aprox.',
    start: 15,
    end: 28,
    summary: 'Antes del siguiente periodo.',
    body: 'Sube la progesterona. Si no hay embarazo, sus niveles bajan y comienza un nuevo periodo. Pueden aparecer cambios de ánimo o sensibilidad.',
    tip: 'Escucha a tu cuerpo: dormir bien y comer variado ayuda.',
  },
]

export type Method = {
  id: string
  name: string
  kind: string
  effectiveness: string // uso típico (OMS)
  effectivenessValue: number
  protectsSTI: boolean
  howItWorks: string
  howToUse: string
  goodToKnow: string
}

export const methods: Method[] = [
  {
    id: 'condon',
    name: 'Condón masculino',
    kind: 'Barrera',
    effectiveness: '87 %',
    effectivenessValue: 87,
    protectsSTI: true,
    howItWorks:
      'Funda de látex que se coloca en el pene erecto e impide que el semen llegue a la vagina.',
    howToUse:
      'Uno nuevo en cada relación, desde el inicio. Revisa la fecha de vencimiento y abre el empaque con los dedos, no con los dientes.',
    goodToKnow:
      'Es el único método (junto al condón femenino) que también protege del VIH y otras infecciones de transmisión sexual. Se entrega gratis en establecimientos del Minsa.',
  },
  {
    id: 'condon-femenino',
    name: 'Condón femenino',
    kind: 'Barrera',
    effectiveness: '79 %',
    effectivenessValue: 79,
    protectsSTI: true,
    howItWorks:
      'Funda suave que se coloca dentro de la vagina y forma una barrera contra el semen.',
    howToUse:
      'Se puede colocar hasta unas horas antes de la relación. Uno nuevo cada vez y nunca junto con un condón masculino.',
    goodToKnow:
      'Da control a quien lo usa y también protege de infecciones de transmisión sexual.',
  },
  {
    id: 'pildora',
    name: 'Píldora anticonceptiva',
    kind: 'Hormonal',
    effectiveness: '93 %',
    effectivenessValue: 93,
    protectsSTI: false,
    howItWorks:
      'Pastilla diaria con hormonas que evita la ovulación.',
    howToUse:
      'Se toma todos los días, idealmente a la misma hora. Olvidarla reduce su eficacia.',
    goodToKnow:
      'Necesita orientación de un profesional de salud para elegir la adecuada. No protege de infecciones: combínala con condón.',
  },
  {
    id: 'inyectable',
    name: 'Inyectable',
    kind: 'Hormonal',
    effectiveness: '96 %',
    effectivenessValue: 96,
    protectsSTI: false,
    howItWorks:
      'Inyección con hormonas que evita la ovulación. Existe la mensual y la trimestral.',
    howToUse:
      'Se aplica en el establecimiento de salud cada mes o cada tres meses, según el tipo. Es importante no pasarse de la fecha.',
    goodToKnow:
      'Es discreto y no requiere acordarse a diario. Puede cambiar el patrón del sangrado.',
  },
  {
    id: 'implante',
    name: 'Implante subdérmico',
    kind: 'Larga duración',
    effectiveness: '> 99 %',
    effectivenessValue: 99.5,
    protectsSTI: false,
    howItWorks:
      'Varilla pequeña y flexible que se coloca bajo la piel del brazo y libera una hormona.',
    howToUse:
      'Lo coloca y retira personal de salud capacitado. Dura de 3 a 5 años, según el tipo.',
    goodToKnow:
      'Es uno de los métodos más eficaces y la fertilidad regresa al retirarlo. La OMS lo considera apropiado para adolescentes.',
  },
  {
    id: 'diu',
    name: 'DIU de cobre (T de cobre)',
    kind: 'Larga duración',
    effectiveness: '> 99 %',
    effectivenessValue: 99.2,
    protectsSTI: false,
    howItWorks:
      'Pequeño dispositivo en forma de T que se coloca dentro del útero e impide la fecundación.',
    howToUse:
      'Lo coloca personal de salud en una consulta. Puede durar hasta 10 años o retirarse cuando se desee.',
    goodToKnow:
      'No tiene hormonas. Según la OMS puede usarse en adolescentes, también si nunca han tenido hijos.',
  },
  {
    id: 'aoe',
    name: 'Anticoncepción oral de emergencia',
    kind: 'Emergencia',
    effectiveness: 'Hasta 95 %',
    effectivenessValue: 95,
    protectsSTI: false,
    howItWorks:
      'Pastilla que retrasa o impide la ovulación después de una relación sin protección o si falló el método.',
    howToUse:
      'Lo antes posible: idealmente en las primeras 24 horas y hasta 3 a 5 días después, según el producto.',
    goodToKnow:
      'No es abortiva ni sirve como método habitual. En el Perú se entrega gratis en los establecimientos del Minsa.',
  },
]

export type Myth = { myth: string; truth: string; source: string }

export const myths: Myth[] = [
  {
    myth: 'En la primera relación sexual no puedes quedar embarazada.',
    truth:
      'Sí es posible. El embarazo puede ocurrir desde la primera vez si hay relaciones sin protección.',
    source: 'Minsa',
  },
  {
    myth: 'Si tienes relaciones durante tu periodo, no hay riesgo.',
    truth:
      'El riesgo es menor, pero existe: el espermatozoide puede vivir hasta 5 días y la ovulación puede adelantarse, sobre todo en ciclos irregulares.',
    source: 'OMS',
  },
  {
    myth: '“Terminar afuera” es una forma segura de cuidarse.',
    truth:
      'El coito interrumpido es poco eficaz: antes de eyacular puede salir líquido con espermatozoides. Y no protege de infecciones.',
    source: 'OMS',
  },
  {
    myth: 'Dos condones a la vez protegen el doble.',
    truth:
      'Al contrario: la fricción entre ellos aumenta el riesgo de que se rompan. Usa siempre uno solo, bien colocado.',
    source: 'Minsa',
  },
  {
    myth: 'La píldora del día siguiente es abortiva.',
    truth:
      'No. Actúa principalmente retrasando o impidiendo la ovulación y no interrumpe un embarazo ya establecido.',
    source: 'OMS',
  },
  {
    myth: 'Los anticonceptivos te dejan infértil para siempre.',
    truth:
      'Falso. Al dejar los métodos temporales, la fertilidad regresa. Algunos, como el inyectable trimestral, pueden tardar unos meses.',
    source: 'OMS',
  },
  {
    myth: 'Hablar de sexualidad hace que los adolescentes empiecen antes.',
    truth:
      'La evidencia muestra lo contrario: la educación sexual integral ayuda a retrasar el inicio y a usar protección cuando llegue el momento.',
    source: 'UNFPA',
  },
  {
    myth: 'Llevar un calendario menstrual evita el embarazo.',
    truth:
      'No es un método anticonceptivo confiable, especialmente en la adolescencia, cuando los ciclos suelen ser irregulares.',
    source: 'OMS',
  },
]

export type Faq = { q: string; a: string }

export const faqs: Faq[] = [
  {
    q: '¿Tengo que ir con mi mamá, papá o una persona adulta?',
    a: 'Puedes acercarte a pedir información y consejería. El personal de salud te explicará qué servicios puedes recibir según tu edad. Si te sientes cómoda o cómodo, ir con una persona adulta de confianza puede ayudarte.',
  },
  {
    q: '¿Lo que cuente en la consulta es confidencial?',
    a: 'Sí. La consejería en salud sexual y reproductiva se basa en el respeto, la privacidad y la confidencialidad. Puedes preguntar todo lo que necesites, sin que nadie te juzgue.',
  },
  {
    q: '¿Cuánto cuesta?',
    a: 'En los establecimientos del Ministerio de Salud, la orientación y los métodos anticonceptivos de planificación familiar se brindan de forma gratuita.',
  },
  {
    q: 'Tuve una relación sin protección, ¿qué hago?',
    a: 'Acude cuanto antes a un establecimiento de salud. La anticoncepción oral de emergencia funciona mejor mientras más pronto se toma (idealmente en las primeras 24 horas). También te pueden orientar sobre pruebas de infecciones de transmisión sexual.',
  },
  {
    q: '¿Es normal que mi periodo sea irregular?',
    a: 'En los primeros años después de la primera menstruación es muy común que los ciclos varíen. Consulta si pasan más de 3 meses sin periodo, si el sangrado es muy abundante o si el dolor no te deja hacer tus actividades.',
  },
  {
    q: '¿A dónde llamo si tengo dudas o necesito ayuda?',
    a: 'En el Perú puedes llamar gratis a la Línea 113 (Infosalud del Minsa) para orientación en salud. Si vives o conoces una situación de violencia, llama a la Línea 100, gratuita y disponible las 24 horas.',
  },
]

export const helpSteps = [
  {
    title: 'Ubica tu establecimiento',
    body: 'Busca el puesto o centro de salud más cercano a tu casa o colegio. También puedes preguntar en el hospital de tu zona.',
  },
  {
    title: 'Pide atención para adolescentes',
    body: 'Solicita el servicio de atención diferenciada para adolescentes o el consultorio de planificación familiar.',
  },
  {
    title: 'Recibe consejería',
    body: 'Un profesional de salud te escuchará y resolverá tus dudas en un espacio privado y respetuoso.',
  },
  {
    title: 'Decide con información',
    body: 'Conoce las opciones y elige lo que mejor se adapta a ti. Puedes volver cuando quieras.',
  },
]

export const sources = [
  {
    name: 'Organización Mundial de la Salud',
    short: 'OMS',
    url: 'https://www.who.int/es',
    description: 'Datos y recomendaciones mundiales sobre salud y anticoncepción.',
  },
  {
    name: 'Fondo de Población de las Naciones Unidas',
    short: 'UNFPA',
    url: 'https://www.unfpa.org/es',
    description: 'Salud sexual y reproductiva, y derechos de adolescentes y jóvenes.',
  },
  {
    name: 'Ministerio de Salud del Perú',
    short: 'Minsa',
    url: 'https://www.gob.pe/minsa',
    description: 'Servicios, establecimientos de salud y orientación en el Perú.',
  },
]
