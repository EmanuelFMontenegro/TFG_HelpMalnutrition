import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';
const getVacunaId = vacuna => vacuna.id.toString();

const CarnetVacunacionScreen = () => {
  const [nombreApellido, setNombreApellido] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [vacunas, setVacunas] = useState([]);
  const [cambiarColor, setCambiarColor] = useState('#00CFEB');
  const fechaNacimientoInputRef = useRef(null);

  const [keyboardAvoidingEnabled, setKeyboardAvoidingEnabled] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const showDatePickerModal = () => {
    Keyboard.dismiss();
    setShowDatePicker(true);
    setKeyboardAvoidingEnabled(false);
  };

  const listaVacunas = [
    {id: 1, nombre: 'BCG'},
    {id: 7, nombre: 'Hepatitis A', dosis: ['12-23 meses']},
    {
      id: 2,
      nombre: 'Hepatitis B',
      dosis: ['2 meses', '4 meses', '11-12 meses'],
    },
    {id: 3, nombre: 'DTP', dosis: ['2 meses', '4 meses', '11-12 meses']},
    {id: 6, nombre: 'Polio', dosis: ['2 meses', '4 meses', '11-12 meses']},
    {id: 9, nombre: 'Neumococo', dosis: ['2 meses', '4 meses', '11-12 meses']},
    {id: 8, nombre: 'Rotavirus', dosis: ['2 meses', '4 meses', '6 meses']},
    {id: 5, nombre: 'Sarampión y Rubeola', dosis: ['12-15 meses']},
    {id: 4, nombre: 'Varicela', dosis: ['12-15 meses']},
  ];
  const resetForm = () => {
    setFechaNacimiento(null);
    setNombreApellido('');
    setVacunas(['']);
  };

  const toggleVacuna = vacuna => {
    const vacunaId = getVacunaId(vacuna);

    setVacunas(prevVacunas => {
      if (prevVacunas.includes(vacunaId)) {
        return prevVacunas.filter(id => id !== vacunaId);
      } else {
        return [...prevVacunas, vacunaId];
      }
    });
  };
  const hideDatePicker = () => {
    setShowDatePicker(false);
  };

  const handleDateChange = (event, date) => {
    if (date) {
      setFechaNacimiento(date);
      hideDatePicker();
    }
  };
  const guardarCarnetVacunacion = async () => {
    setCambiarColor('#4169e1');
    Keyboard.dismiss();
    const selectedVacunas = listaVacunas.filter(vacuna =>
      vacunas.includes(vacuna.id.toString()),
    );
    const selectedVacunaNombres = selectedVacunas.map(vacuna => vacuna.nombre);

    const fechaNacimientoFormatted = fechaNacimiento
      ?.toISOString()
      .slice(0, 10);

    const dataVacunas = {
      nombreApellido,
      fechaNacimiento: fechaNacimientoFormatted,
      vacunas: selectedVacunaNombres,
    };
    console.log('Datos a enviar:', dataVacunas);
    try {
      const response = await fetch('http://15.228.101.67:3000/cargarVacunas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataVacunas),
      });

      if (!response.ok) {
        throw new Error(
          `Error al cargar vacunas: ${response.status} ${response.statusText}`,
        );
      }

      Alert.alert('Guardar', 'Vacunas guardadas correctamente', [
        {text: 'OK', onPress: () => resetForm()},
      ]);
    } catch (error) {
      Alert.alert(
        'Atención',
        'Error al guardar las vacunas. Por favor, inténtelo nuevamente más tarde.',
      );
    }
    setTimeout(() => {
      setCambiarColor('#00CFEB');
    }, 400);
  };
  const updateButtonStatus = () => {
    if (nombreApellido && fechaNacimiento && vacunas.length > 0) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled={keyboardAvoidingEnabled}>
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={styles.paciente}>
            <Text style={styles.label}>Nombre y Apellido</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={nombreApellido}
                onChangeText={setNombreApellido}
                placeholder="Nombre y Apellido"
              />
            </View>
            <Text style={styles.label}>Fecha de Nacimiento</Text>
            <TouchableOpacity
              style={styles.dateContainer}
              onPress={showDatePickerModal}>
              <Text style={styles.dateText}>
                {fechaNacimiento
                  ? fechaNacimiento.toLocaleDateString('es-ES')
                  : 'Seleccionar fecha'}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={fechaNacimiento || new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}

            <Text style={styles.label}>Vacunas</Text>
            {listaVacunas.map(vacuna => (
              <View key={vacuna.id} style={styles.vacunaRow}>
                <CheckBox
                  value={vacunas.includes(vacuna.id.toString())}
                  onValueChange={() => toggleVacuna(vacuna)}
                  style={styles.checkbox}
                  tintColors={{
                    true: '#00CFEB',
                    false: 'black',
                    disabled: 'gray',
                  }}
                  disabled={false}
                />
                <View style={styles.labelContainer}>
                  <Text style={styles.vacunaLabel}>{vacuna.nombre}</Text>
                  {vacuna.dosis && vacuna.dosis.length > 0 && (
                    <Text style={styles.vacunaDosis}>
                      ({vacuna.dosis.join(', ')})
                    </Text>
                  )}
                </View>
              </View>
            ))}

            <TouchableOpacity
              onPress={guardarCarnetVacunacion}
              style={[styles.button, {backgroundColor: cambiarColor}]}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>

            {showDatePicker && (
              <Button
                title="Cancelar"
                onPress={hideDatePicker}
                style={styles.button}
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  paciente: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    borderColor: '#00CFEB',
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    marginTop: 15,
  },
  label: {
    fontSize: 17,
    fontWeight: '400',
    color: '#00CFEB',
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#00CFEB',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#ffffff90',
    color: 'black',
  },
  vacunaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dateContainer: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#00CFEB',
    padding: 10,
    marginBottom: 10,
  },
  dateText: {
    color: 'black',
  },
  checkbox: {
    marginRight: 10,
  },
  labelContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  vacunaLabel: {
    marginLeft: 10,
    color: '#00CFEB',
    flex: 1,
  },
  vacunaDosis: {
    marginLeft: 5,
    fontStyle: 'italic',
    color: '#00CFEB',
    fontSize: 12,
  },
  button: {
    width: '100%',
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#fff',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '400',
    color: 'white',
  },
});

export default CarnetVacunacionScreen;
