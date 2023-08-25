import express from "express";
import {
  getdatosBebeByDNI,
  insertarDatosBebe,
  insertarVacunas,
  insertarDatosRostro,
} from "./database.js";
import cors from "cors";

const corsOptions = {
  origin: "http://15.228.101.67:80",
  methods: ["GET", "POST"],
  credentials: true,
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.get("/datosBebe/:dni", async (req, res) => {
  try {
    const dni = req.params.dni;
    console.log("Buscando datos del bebé con DNI:", dni);

    const datos_bebe = await getdatosBebeByDNI(dni);

    if (datos_bebe) {
      console.log("Datos del bebé encontrados:", datos_bebe);
      res.status(200).send(datos_bebe);
    } else {
      console.log("No se encontraron datos para el DNI:", dni);
      res
        .status(404)
        .json({ error: "No se encontraron datos para el DNI proporcionado" });
    }
  } catch (error) {
    console.error("Error al buscar datos del bebé:", error);
    res.status(500).json({ error: "Error al buscar datos del bebé" });
  }
});

app.post("/datosBebe/", async (req, res) => {
  const datosBebe = req.body;
  try {
    const resultado = await insertarDatosBebe(datosBebe);
    res.status(200).json({ message: "Datos insertados correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al insertar los datos del bebé" });
  }
});

app.post("/cargarVacunas/", async (req, res) => {
  const cargarVacunas = req.body;
  try {
    const resultado = await insertarVacunas(cargarVacunas);
    res.status(200).json({ message: "Vacunas Cargadas correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al cargar Vacunas" });
  }
});
app.post("/reconocimientoFacial", async (req, res) => {
  const rostroData = req.body;
  try {
    const result = await insertarDatosRostro(rostroData);
    res.status(200).json({ message: "Rostro Registrado" });
  } catch (error) {
    res.status(500).json({ error: "Error al Registrar Rostro" });
  }
});

app.listen(80, () => {
  console.log("Servidor escuchando en el puerto 80");
});
