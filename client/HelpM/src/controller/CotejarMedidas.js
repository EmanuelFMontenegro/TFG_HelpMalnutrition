import MedidasBebes from './MedidasBebes';

const CotejarMedidas = (sexo, edadMeses, perimetroCefalico, peso, altura) => {
  const sexoMiniscula = sexo.toLowerCase();
  const medidas = MedidasBebes[sexoMiniscula];
  const medidaPeso = medidas.peso.find(medida => medida.edad === edadMeses);
  const medidaAltura = medidas.altura.find(medida => medida.edad === edadMeses);
  const medidaPerimetroCefalico = medidas.perimetroCefalico.find(
    medida => medida.edad === edadMeses,
  );
  if (!medidaPeso || !medidaAltura || !medidaPerimetroCefalico) {
    throw new Error('No se encontraron medidas para la edad especificada.');
  }
  if (
    isNaN(peso) ||
    peso <= 0 ||
    isNaN(altura) ||
    altura <= 0 ||
    isNaN(perimetroCefalico) ||
    perimetroCefalico <= 0
  ) {
    throw new Error(
      'Por favor, ingrese medidas válidas para peso, altura y perímetro cefálico.',
    );
  }
  const porcentajeDesnutricionPeso = (medidaPeso.min - peso) / medidaPeso.min;
  const porcentajeDesnutricionAltura =
    (medidaAltura.min - altura) / medidaAltura.min;
  const porcentajeDesnutricionPerimetroCefalico =
    (medidaPerimetroCefalico.min - perimetroCefalico) /
    medidaPerimetroCefalico.min;
  const gradosDesnutricion = {
    gradoI: 0.15, // 15% por debajo del peso ideal
    gradoII: 0.25, // 25% por debajo del peso ideal
    gradoIII: 0.4, // 40% por debajo del peso ideal
  };
  let gradoDesnutricion = 'normal';
  if (
    porcentajeDesnutricionPeso >= gradosDesnutricion.gradoIII ||
    porcentajeDesnutricionAltura >= gradosDesnutricion.gradoIII ||
    porcentajeDesnutricionPerimetroCefalico >= gradosDesnutricion.gradoIII
  ) {
    gradoDesnutricion = 'grado III';
  } else if (
    porcentajeDesnutricionPeso >= gradosDesnutricion.gradoII ||
    porcentajeDesnutricionAltura >= gradosDesnutricion.gradoII ||
    porcentajeDesnutricionPerimetroCefalico >= gradosDesnutricion.gradoII
  ) {
    gradoDesnutricion = 'grado II';
  } else if (
    porcentajeDesnutricionPeso >= gradosDesnutricion.gradoI ||
    porcentajeDesnutricionAltura >= gradosDesnutricion.gradoI ||
    porcentajeDesnutricionPerimetroCefalico >= gradosDesnutricion.gradoI
  ) {
    gradoDesnutricion = 'grado I';
  }
  let mensajeDesnutricion = '';
  if (gradoDesnutricion === 'normal') {
    mensajeDesnutricion =
      'El bebé no está desnutrido. Sus valores son normales.';
  } else {
    mensajeDesnutricion = `El bebé está desnutrido y su nivel es ${gradoDesnutricion}.`;
  }
  return {
    bebeDesnutrido: gradoDesnutricion !== 'normal',
    nivelDesnutricion: gradoDesnutricion,
    mensajeDesnutricion: mensajeDesnutricion,
  };
};

export default CotejarMedidas;
