import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {BarChart} from 'react-native-chart-kit';

function ResultadosScreen() {
  const [dni, setDni] = useState('');
  const [datosBebe, setDatosBebe] = useState(null);
  const [pesoData, setPesoData] = useState([]);
  const [datosCargados, setDatosCargados] = useState(false);
  const [mostrarGrafica, setMostrarGrafica] = useState(false);

  const handleBuscar = async () => {
    setMostrarGrafica(false);
    try {
      const response = await fetch(`http://192.168.0.7:8080/datosBebe/${dni}`);
      if (response.ok) {
        const datosBebe = await response.json();
        if (Array.isArray(datosBebe) && datosBebe.length > 0) {
          setDatosBebe(datosBebe);
        } else {
          setDatosBebe(null);
          Alert.alert(
            'Error de en la busqueda',
            'El DNI no se encuentra en la base de datos.',
          );
        }
      } else {
        console.error('Error al buscar el dni del bebé');
        setDatosBebe(null);
        Alert.alert(
          'Error',
          'Hubo un problema al buscar el DNI del bebé. Por favor, intenta nuevamente.',
        );
      }
    } catch (error) {
      console.error('Error al buscar el dni del bebé:', error);
      setDatosBebe(null);
      Alert.alert(
        'Error',
        'Hubo un error al buscar el DNI del bebé. Por favor, intenta nuevamente.',
      );
      setMostrarGrafica(false);
    }
  };

  const handleMostrarGrafica = () => {
    setMostrarGrafica(true);
  };
  const formatDate = dateString => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  };

  const isCreciendo = () => {
    if (pesoData.length <= 1) return false;

    const ultimoPeso = pesoData[pesoData.length - 1].peso;
    const pesoAnterior = pesoData[pesoData.length - 2].peso;

    return ultimoPeso > pesoAnterior;
  };
  const options = {
    scales: {
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
        },
      },
    },
  };

  const renderDatosBebe = () => {
    if (!datosBebe) return null;

    return (
      <View style={styles.datosContainer}>
        <Text style={styles.label}>Informacion del bebé :</Text>
        {datosBebe.map((bebe, index) => (
          <View key={index}>
            <Text style={styles.label}>Nombre: {bebe.nombreApellido}</Text>
            <Text style={styles.label}>
              Fecha de Nacimiento: {formatDate(bebe.fechaNacimiento)}
            </Text>
            <Text style={styles.label}>Edad: {bebe.edad}</Text>
            <Text style={styles.label}>Peso: {bebe.peso}</Text>
            <Text style={styles.label}>
              Perímetro Cefálico: {bebe.perimetroCefalico}
            </Text>
            <Text style={styles.label}>Altura: {bebe.altura}</Text>
            <Text style={styles.label}>
              Fecha de Visita: {formatDate(bebe.fechaVisita)}
            </Text>
            <View style={styles.separator} />
          </View>
        ))}
      </View>
    );
  };

  useEffect(() => {
    if (datosBebe && !datosCargados) {
      const processedData = datosBebe.map(item => ({
        date: new Date(item.fechaVisita),
        peso: item.peso,
      }));
      setPesoData(processedData);
      setDatosCargados(true);
    }
  }, [datosBebe, datosCargados]);

  setTimeout(() => {
    setMostrarGrafica(false);
    setDatosBebe(null);
    setDni('');
  }, 500000);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Ingrese el DNI del bebé:</Text>
        <TextInput
          style={styles.input}
          placeholder="DNI"
          value={dni}
          onChangeText={setDni}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={handleBuscar}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {renderDatosBebe()}

      {datosBebe !== null && datosBebe.length > 0 && (
        <TouchableOpacity style={styles.button} onPress={handleMostrarGrafica}>
          <Text style={styles.buttonText}>Ver Gráfica</Text>
        </TouchableOpacity>
      )}

      {mostrarGrafica && pesoData.length >= 1 && (
        <View style={styles.graficoContainer}>
          <BarChart
            data={{
              labels: pesoData.map(data => formatDate(data.date)),
              datasets: [
                {
                  data: pesoData.map(data => data.peso),
                },
              ],
            }}
            width={365}
            height={230}
            yAxisLabel="Peso"
            chartConfig={{
              backgroundColor: '#F5F5F5',
              backgroundGradientFrom: '#F5F5F5',
              backgroundGradientTo: '#F5F5F5',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            style={styles.grafico}
            options={options}
          />
          <Text style={styles.mensajeCrecimiento}>
            {isCreciendo()
              ? '¡El bebé está creciendo!'
              : 'El bebé no está creciendo'}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#00CFEB',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#00CFEB',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  datosContainer: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#00CFEB',
    marginBottom: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#00CFEB',
    marginVertical: 5,
  },
  graficoContainer: {
    alignItems: 'center',
  },
  grafico: {
    marginVertical: 8,
    borderRadius: 10,
  },
  mensajeCrecimiento: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00CFEB',
  },
});

export default ResultadosScreen;
