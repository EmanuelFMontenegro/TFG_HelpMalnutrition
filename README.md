<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HelpMalnutrition - Aplicación Móvil</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
      color: #333;
    }
    header {
      background-color: #4CAF50;
      color: white;
      padding: 1rem 2rem;
      text-align: center;
    }
    section {
      padding: 2rem;
      max-width: 800px;
      margin: auto;
    }
    h1, h2, h3 {
      color: #4CAF50;
    }
    .highlight {
      background-color: #f4f4f4;
      border-left: 5px solid #4CAF50;
      padding: 1rem;
      margin: 1rem 0;
    }
    pre {
      background-color: #f4f4f4;
      border: 1px solid #ddd;
      padding: 1rem;
      overflow-x: auto;
    }
    ul {
      list-style-type: square;
      margin: 1rem 0;
      padding-left: 1.5rem;
    }
    a {
      color: #4CAF50;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    footer {
      background-color: #333;
      color: white;
      text-align: center;
      padding: 1rem 0;
      margin-top: 2rem;
    }
  </style>
</head>
<body>
  <header>
    <h1>HelpMalnutrition</h1>
    <p>Aplicación móvil para la detección de desnutrición infantil</p>
  </header>

  <section>
    <h2>Descripción del Proyecto</h2>
    <p>
      HelpMalnutrition es una aplicación móvil diseñada para la detección temprana de indicadores de desnutrición infantil mediante análisis facial. 
      Este proyecto utiliza inteligencia artificial y estándares biométricos basados en la OMS, adaptados a la región de América Latina.
    </p>
    <div class="highlight">
      <strong>Impacto:</strong> Este proyecto aborda un problema social crítico, ayudando a profesionales de la salud a detectar y atender casos de desnutrición infantil de manera eficiente y precisa.
    </div>

    <h2>Características Principales</h2>
    <ul>
      <li>Análisis facial con TensorFlow.js (FaceAPI) para identificar indicadores biométricos.</li>
      <li>Gestión eficiente del estado de la aplicación mediante Redux.</li>
      <li>Interfaz intuitiva y accesible diseñada con React Native Paper.</li>
      <li>Adaptación de estándares biométricos basados en el último informe de la OMS.</li>
      <li>Compatibilidad multiplataforma (Android e iOS) gracias a React Native (Expo).</li>
    </ul>

    <h2>Tecnologías Utilizadas</h2>
    <ul>
      <li><strong>Framework:</strong> React Native (Expo)</li>
      <li><strong>Inteligencia Artificial:</strong> TensorFlow.js (FaceAPI)</li>
      <li><strong>Gestión de Estado:</strong> Redux</li>
      <li><strong>UI:</strong> React Native Paper</li>
      <li><strong>Lenguaje:</strong> JavaScript</li>
    </ul>

    <h2>Instalación y Configuración</h2>
    <h3>Requisitos Previos</h3>
    <ul>
      <li>Node.js (versión 16 o superior)</li>
      <li>Expo CLI</li>
      <li>Cuenta de Expo para pruebas en dispositivos reales</li>
    </ul>
    <h3>Pasos para Ejecutar</h3>
    <pre>
1. Clona este repositorio:
   git clone https://github.com/EmanuelFMontenegro/TFG_HelpMalnutrition.git
   cd TFG_HelpMalnutrition

2. Instala las dependencias:
   npm install

3. Inicia el servidor Expo:
   npm start

4. Escanea el código QR con la app Expo Go en tu dispositivo móvil.
    </pre>

    <h2>Estructura del Proyecto</h2>
    <pre>
TFG_HelpMalnutrition/
├── assets/            # Recursos estáticos (imágenes, íconos, etc.)
├── components/        # Componentes reutilizables
├── screens/           # Pantallas principales de la app
├── redux/             # Configuración y gestión del estado global
├── utils/             # Funciones auxiliares y constantes
├── App.js             # Archivo principal de la aplicación
├── package.json       # Información del proyecto y dependencias
    </pre>

    <h2>Contribuciones</h2>
    <p>
      ¡Las contribuciones son bienvenidas! Si deseas mejorar esta aplicación, sigue estos pasos:
    </p>
    <pre>
1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad:
   git checkout -b feature/nueva-funcionalidad

3. Realiza tus cambios y haz commit:
   git commit -m "Descripción de la nueva funcionalidad"

4. Envía un pull request y explícanos tus cambios.
    </pre>

    <h2>Licencia</h2>
    <p>Este proyecto está licenciado bajo la <a href="LICENSE">MIT License</a>.</p>

    <h2>Contacto</h2>
    <p>Si tienes preguntas o sugerencias, no dudes en contactarme:</p>
    <ul>
      <li><strong>Nombre:</strong> Emanuel F. Montenegro</li>
      <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/emanuel-montenegro/" target="_blank">linkedin.com/in/emanuel-montenegro</a></li>
      <li><strong>Correo Electrónico:</strong> emanuel@example.com</li>
    </ul>
  </section>

  <footer>
    <p>&copy; 2024 Emanuel F. Montenegro - HelpMalnutrition</p>
  </footer>
</body>
</html>

