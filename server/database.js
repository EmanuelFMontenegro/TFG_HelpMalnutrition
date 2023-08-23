import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
    ssl: process.env.MYSQL_SSL,
  })
  .promise();

export async function getdatosBebeByDNI(dni) {
  try {
    const [rows] = await pool.query(
      `SELECT fechaVisita,dni, peso, nombreApellido,edad,perimetroCefalico,altura,sexo,fechaNacimiento FROM datos_bebe WHERE dni=? ORDER BY fechaVisita`,
      [dni]
    );
    return rows;
  } catch (error) {
    console.error("Error al obtener datos del bebé por DNI:", error);
    throw error;
  }
}

export async function insertarDatosBebe(datosBebe) {
  try {
    const {
      id,
      dni,
      nombreApellido,
      fechaNacimiento,
      edad,
      peso,
      perimetroCefalico,
      altura,
      sexo,
      fechaVisita,
    } = datosBebe;

    const query = ` INSERT INTO datos_bebe (id, dni, nombreApellido, fechaNacimiento, edad, peso, perimetroCefalico, altura, sexo, fechaVisita)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

    const [row] = await pool.query(query, [
      id,
      dni,
      nombreApellido,
      fechaNacimiento,
      edad,
      peso,
      perimetroCefalico,
      altura,
      sexo,
      fechaVisita,
    ]);

    return row;
  } catch (error) {
    console.error("Error al insertar datos del bebé:", error);
    throw error;
  }
}
export async function insertarVacunas(cargarVacunas) {
  try {
    const { nombreApellido, fechaNacimiento, vacunas } = cargarVacunas;
    const query = `INSERT INTO carnet_vacunacion (nombreApellido, fechaNacimiento, vacunas) VALUES (?, ?, ?);`;
    const vacunasString = vacunas.join(", ");
    const [row] = await pool.query(query, [
      nombreApellido,
      fechaNacimiento,
      vacunasString,
    ]);
    return row;
  } catch (error) {
    console.error("Error al intentar cargar las vacunas:", error);
    throw error;
  }
}

export async function insertarDatosRostro(rostroData) {
  try {
    const {
      faceID,
      leftEyePositionX,
      leftEyePositionY,
      rightEyePositionX,
      rightEyePositionY,
      noseBasePositionX,
      noseBasePositionY,
      leftMouthPositionX,
      leftMouthPositionY,
      rightMouthPositionX,
      rightMouthPositionY,
      bottomMouthPositionX,
      bottomMouthPositionY,
      leftCheekPositionX,
      leftCheekPositionY,
      rightCheekPositionX,
      rightCheekPositionY,
      leftEarPositionX,
      leftEarPositionY,
      rightEarPositionX,
      rightEarPositionY,
      rollAngle,
      yawAngle,
    } = rostroData;

    const query = `
      INSERT INTO faceDetection 
        (faceID, leftEyePositionX, leftEyePositionY, rightEyePositionX, rightEyePositionY, noseBasePositionX, noseBasePositionY, leftMouthPositionX, leftMouthPositionY, rightMouthPositionX, rightMouthPositionY, bottomMouthPositionX, bottomMouthPositionY, leftCheekPositionX, leftCheekPositionY, rightCheekPositionX, rightCheekPositionY, leftEarPositionX, leftEarPositionY, rightEarPositionX, rightEarPositionY, rollAngle, yawAngle)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const [row] = await pool.query(query, [
      faceID,
      leftEyePositionX,
      leftEyePositionY,
      rightEyePositionX,
      rightEyePositionY,
      noseBasePositionX,
      noseBasePositionY,
      leftMouthPositionX,
      leftMouthPositionY,
      rightMouthPositionX,
      rightMouthPositionY,
      bottomMouthPositionX,
      bottomMouthPositionY,
      leftCheekPositionX,
      leftCheekPositionY,
      rightCheekPositionX,
      rightCheekPositionY,
      leftEarPositionX,
      leftEarPositionY,
      rightEarPositionX,
      rightEarPositionY,
      rollAngle,
      yawAngle,
    ]);

    return row;
  } catch (error) {
    console.error("Error al insertar datos del reconocimiento facial:", error);
    throw error;
  }
}
// Función para buscar un rostro en la base de datos por su ID
export async function searchFaceInDatabase(faceData) {
  try {
    const [rows] = await pool.query(
      `SELECT name FROM faceDetection WHERE faceID = ?`,
      [faceData.faceID]
    );

    if (rows.length > 0) {
      const name = rows[0].name;
      return name;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al buscar el rostro en la base de datos:", error);
    throw error;
  }
}

// Función para comparar el rostro detectado con los rostros en la base de datos
export async function compareAndSearchFaceInDatabase(faceData) {
  try {
    const dbFaceData = await getAllFacesFromDatabase(); // Obtener todos los rostros de la base de datos
    const isMatch = compareFacesWithDatabase(faceData, dbFaceData);

    if (isMatch) {
      const nameInDatabase = await searchFaceInDatabase(faceData);
      if (nameInDatabase) {
        return `Rostro reconocido: ${nameInDatabase}`;
      } else {
        return "Rostro no reconocido en la base de datos";
      }
    } else {
      return "Rostro no reconocido";
    }
  } catch (error) {
    console.error(
      "Error al realizar la comparación y búsqueda en la base de datos:",
      error
    );
    throw error;
  }
}

// Función para obtener todos los rostros de la base de datos
export async function getAllFacesFromDatabase() {
  try {
    const [rows] = await pool.query("SELECT * FROM faceDetection");
    return rows;
  } catch (error) {
    console.error("Error al obtener los rostros de la base de datos:", error);
    throw error;
  }
}
