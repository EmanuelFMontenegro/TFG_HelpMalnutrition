import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getdatosBebeById(id) {
  try {
    const [row] = await pool.query(`SELECT * FROM datos_bebe WHERE id=?`, [id]);
    return row;
  } catch (error) {
    console.error("Error al obtener datos del bebé por id:", error);
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
