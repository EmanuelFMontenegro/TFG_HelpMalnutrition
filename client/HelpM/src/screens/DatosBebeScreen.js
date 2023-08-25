import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CotejarMedidas from '../controller/CotejarMedidas';

function DatosBebeScreen() {
  const navigation = useNavigation();
  const [fechaVisita, setFechaVisita] = useState(null);
  const [fechaNacimiento, setFechaNacimiento] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedFecha, setSelectedFecha] = useState(null);
  const [sexo, setSexo] = useState('');
  const [nombreApellido, setNombreApellido] = useState('');
  const [dni, setDni] = useState('');
  const [edad, setEdad] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [perimetroCefalico, setPerimetroCefalico] = useState('');
  const [buttonColor, setButtonColor] = useState('#00CFEB');
  const [cambiarColor, setCambiarColor] = useState('#00CFEB');
  const resetForm = () => {
    setFechaNacimiento(null);
    setFechaVisita(null);
    setSexo('');
    setNombreApellido('');
    setDni('');
    setEdad('');
    setPeso('');
    setPerimetroCefalico('');
    setAltura('');
  };
  const handleSexoChange = nuevoSexo => {
    setSexo(nuevoSexo);
    console.log('Nuevo sexo seleccionado:', nuevoSexo);
  };
  const [mostrarTratamiento, setMostrarTratamiento] = useState(false);
  const handleGuardar = async () => {
    setCambiarColor('#4169e1');
    const fechaNacimientoFormatted = fechaNacimiento
      ? fechaNacimiento.toISOString().slice(0, 10)
      : null;
    const fechaVisitaFormatted = fechaVisita
      ? fechaVisita.toISOString().slice(0, 10)
      : null;
    if (!perimetroCefalico) {
      Alert.alert('Atencion', 'Por favor, complete todo el formulario.');
      return;
    }
    const datos = {
      dni,
      nombreApellido,
      fechaNacimiento: fechaNacimientoFormatted,
      edad,
      peso,
      perimetroCefalico,
      altura,
      sexo,
      fechaVisita: fechaVisitaFormatted,
    };
    try {
      const response = await fetch('http://15.228.101.67:3000/datosBebe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
      });
      if (response.ok) {
        Alert.alert('Mensaje Exitoso', 'Datos guardados correctamente', [
          {text: 'OK', onPress: () => resetForm()},
        ]);
      } else {
        Alert.alert('Error', 'Error al guardar los datos');
      }
    } catch (error) {
       Alert.alert('Error', 'Error al guardar los datos');
    }
    setTimeout(() => {
      setCambiarColor('#00CFEB');
    }, 400);
  };

  const [mostrarResultado, setMostrarResultado] = useState(false);
  const handleMostrarTratamiento = nivelDesnutricion => {
    setMostrarTratamiento(true);
  };
  const tratamientoMensajes = {
    normal:
      'El bebé no necesita tratamiento especial. Sus valores son normales.',
    'grado I':
      'Nivel I : El niño puede ser tratado en casa con una dieta alta en calorías y nutrientes. La dieta debe incluir una variedad de alimentos, como frutas, verduras, cereales integrales, carnes magras, pescado, huevos, leche y productos lácteos, aceites vegetales, nueces y semillas. También se puede recomendar la suplementación con leche en polvo o alimentos terapéuticos listos para usar (RUTF). La RUTF es un alimento alto en calorías y nutrientes que se puede utilizar para tratar la desnutrición.',
    'grado II':
      'Nivel II : El niño debe ser hospitalizado para recibir tratamiento nutricional intravenoso. También se puede recomendar la suplementación con RUTF. El tratamiento intravenoso se utiliza para proporcionar al niño nutrientes que no puede obtener de la comida. La RUTF se puede utilizar para complementar la dieta del niño y ayudarle a recuperar peso.',

    'grado III':
      'Nivel III : El niño debe ser hospitalizado para recibir tratamiento nutricional intravenoso y RUTF. También puede necesitar tratamiento para otras complicaciones, como infecciones. El tratamiento intravenoso y la RUTF se utilizan para proporcionar al niño los nutrientes que necesita para recuperarse y prevenir complicaciones.',
  };

  const handleResultado = () => {
    setButtonColor('#4169e1');
    setTimeout(() => {
      setButtonColor('#00CFEB');
    }, 400);
    const edadMeses = parseInt(edad, 10);
    if (isNaN(edadMeses)) {
      Alert.alert('Atencion', 'Por favor, complete todo el formulario.');
      return;
    }
    if (sexo === '') {
      Alert.alert('Atencion', 'Por favor, seleccione el sexo del bebe.');
      return;
    }
    if (peso === '') {
      Alert.alert('Atencion', 'Por favor, agregue el peso del bebe.');
      return;
    }
    const sexoLower = sexo.toLowerCase();
   
    try {
      const {bebeDesnutrido, nivelDesnutricion, mensajeDesnutricion} =
        CotejarMedidas(
          sexoLower,
          edadMeses,
          parseFloat(perimetroCefalico),
          parseFloat(peso),
          parseFloat(altura),
        );

      console.log(
        'Resultados de CotejarMedidas:',
        bebeDesnutrido,
        nivelDesnutricion,
      );
      let message = '';

      if (bebeDesnutrido) {
        const tratamientoMensaje =
          tratamientoMensajes[nivelDesnutricion] ||
          'No se encontró información de tratamiento para el grado de desnutrición.';

        setTimeout(() => {
          Alert.alert('Tratamiento:', tratamientoMensaje);
        }, 2500);
        if (nivelDesnutricion === 'grado III') {
          message =
            'El bebé se encuentra desnutrido y su nivel es de grado III.';
        } else if (nivelDesnutricion === 'grado II') {
          message =
            'El bebé se encuentra desnutrido y su nivel es de grado II.';
        } else if (nivelDesnutricion === 'grado I') {
          message = 'El bebé se encuentra desnutrido y su nivel es de grado I.';
        } else {
          message =
            'El bebé se encuentra desnutrido y su nivel es desconocido.';
        }
        Alert.alert(
          'Atencion',
          mensajeDesnutricion,

          [
            {
              text: 'Aceptar',
              onPress: () => setMostrarResultado(false),
              style:
                nivelDesnutricion === 'grado I' ? 'default' : 'destructive',
            },
          ],
          {cancelable: false},
        );
      } else {
        message = 'El bebé se encuentra en un estado de nutrición óptimo.';
        Alert.alert(
          'Atencion',
          message,
          [
            {
              text: 'Aceptar',
              onPress: () => {
                setMostrarResultado(false);
                handleMostrarTratamiento(nivelDesnutricion);
              },
            },
          ],

          {
            cancelable: false,
          },
        );
      }
    } catch (error) {
            Alert.alert('Error', error.message);
    }
  };

  const showDatePickerModal = type => {
    setShowDatePicker(true);
    setSelectedFecha(type);
  };
  const hideDatePickerModal = () => {
    setShowDatePicker(false);
  };
  const handleDateChange = (_, date) => {
    if (date) {
      const selectedDate = new Date(date);

      if (selectedFecha === 'nacimiento') {
        setFechaNacimiento(selectedDate);
      } else if (selectedFecha === 'visita') {
        setFechaVisita(selectedDate);
      }
    }
    hideDatePickerModal();
  };
  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.paciente}>
          <Text style={styles.label}>Nombre Y Apellido</Text>
          <TextInput
            style={styles.input}
            placeholder="nombre y apellido"
            value={nombreApellido}
            onChangeText={setNombreApellido}
          />
          <Text style={styles.label}>Dni</Text>
          <TextInput
            style={styles.input}
            placeholder="dni"
            value={dni}
            onChangeText={setDni}
          />
          <Text style={styles.label}>Fecha de Nacimiento</Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => showDatePickerModal('nacimiento')}>
            <Text
              style={[
                styles.dateText,
                selectedFecha === 'nacimiento' ? styles.blackText : null,
              ]}>
              {fechaNacimiento
                ? fechaNacimiento.toLocaleDateString('es-ES')
                : 'seleccionar la fecha de nacimiento'}
            </Text>
          </TouchableOpacity>
          <Text style={styles.label}>Edad en Meses</Text>
          <TextInput
            style={styles.input}
            placeholder="edad en meses"
            value={edad}
            onChangeText={setEdad}
          />
          <Text style={styles.label}>Peso</Text>
          <TextInput
            style={styles.input}
            placeholder="peso"
            value={peso}
            onChangeText={setPeso}
          />
          <Text style={styles.label}>Circunferencia de la Cabeza</Text>
          <TextInput
            style={styles.input}
            placeholder="circunferencia de la cabeza en cm"
            value={perimetroCefalico}
            onChangeText={setPerimetroCefalico}
          />
          <Text style={styles.label}>Altura</Text>
          <TextInput
            style={styles.input}
            placeholder="altura en cm"
            value={altura}
            onChangeText={setAltura}
          />
          <Text style={styles.label}>Sexo</Text>
          <View style={styles.sexContainer}>
            <TouchableOpacity
              style={[
                styles.sexButton,
                sexo === 'masculino' ? styles.selectedSex : null,
              ]}
              onPress={() => handleSexoChange('masculino')}>
              <Text
                style={[
                  styles.sexButtonText,
                  sexo === 'masculino' ? styles.selectedSexText : null,
                ]}>
                Niño
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sexButton,
                sexo === 'femenino' ? styles.selectedSex : null,
              ]}
              onPress={() => handleSexoChange('femenino')}>
              <Text
                style={[
                  styles.sexButtonText,
                  sexo === 'femenino' ? styles.selectedSexText : null,
                ]}>
                Niña
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.label}>Fecha de Visita</Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => showDatePickerModal('visita')}>
            <Text
              style={[
                styles.dateText,
                selectedFecha === 'visita' ? styles.blackText : null,
              ]}>
              {fechaVisita
                ? fechaVisita.toLocaleDateString('es-ES')
                : 'seleccionar la fecha de visita'}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={
                selectedFecha === 'nacimiento'
                  ? fechaNacimiento || new Date()
                  : fechaVisita || new Date()
              }
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          <TouchableOpacity
            onPress={handleResultado}
            style={[styles.button, {backgroundColor: buttonColor}]}>
            <Text style={styles.buttonText}>Resultado</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleGuardar}
            style={[styles.button, {backgroundColor: cambiarColor}]}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpace} />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 4,
  },
  content: {
    paddingBottom: 4,
  },
  paciente: {
    width: '100%',
    borderColor: '#00CFEB',
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
  },
  label: {
    fontSize: 17,
    fontWeight: '400',
    color: '#00CFEB',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#00CFEB',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#ffffff90',
    color: 'black',
  },
  button: {
    width: '100%',
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderColor: '#fff',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '400',
    color: 'white',
  },
  dateInput: {
    width: '100%',
    height: 40,
    borderColor: '#00CFEB',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#ffffff90',
    justifyContent: 'center',
  },
  dateText: {
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blackText: {
    color: 'white',
  },
  sexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 10,
  },
  sexButton: {
    width: '48%',
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00CFEB',
  },
  sexButtonText: {
    fontSize: 17,
    fontWeight: '400',
    color: 'white',
  },
  selectedSex: {
    backgroundColor: '#4169e1',
  },
  selectedSexText: {
    color: 'white',
  },

  blackText: {
    color: 'black',
  },
  bottomSpace: {
    height: 10,
  },
});

export default DatosBebeScreen;
