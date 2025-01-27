# Diseños de Patrón utilizados

[ En general ]
- Modularidad de los componentes separados por estructura de carpetas lógica
- Creación Utilidades comunes para administración de Funciones y Constantes de apoyo.

[ Backend ]
- Diseño de Esquemas y Resolvers para GraphQL
- Unificación de Esquemas y Resolvers para KoA
- Diseño modular de Resolvers especificando Queries y Mutations para GraphQL
- Extracción de funciones de utilidad para lectura de archivos ( para administrar el JSON )

[ Frontend ]
- Enrutado basado en estructura de archivos
- Uso de ContextProvider para control global de estado de la aplicación: src/app/_hooks/WebContext.tsx