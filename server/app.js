import express from "express";
import {
  getdatosBebeById,
  insertarDatosBebe,
  insertarVacunas,
} from "./database.js";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8080",
  methods: ["GET", "POST"],
  credentials: true,
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.get("/datosBebe/:id", async (req, res) => {
  const datos_bebe = await getdatosBebeById(req.params.id);
  res.status(200).send(datos_bebe);
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

app.listen(8080, () => {
  console.log("Servidor corriendo en el puerto 8080");
});
