import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from '../service/firebaseConfig';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

const LoginScreen = ({onLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const navigation = useNavigation();

  const togglePasswordVisibility = () => {
    setSecureTextEntry(prevState => !prevState);
  };

  const handleCreateAccount = () => {
    if (!email || !password) {
      setEmailError(!email);
      setPasswordError(!password);
      return;
    }

    setEmailError(false);
    setPasswordError(false);

    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        Alert.alert('Usuario creado', 'Usuario creado exitosamente');
        const user = userCredential.user;
        
      })
      .catch(error => {
        Alert.alert('Error', 'El Usuario ya Existe');
       
      });
  };

  const handleSignIn = () => {
    if (!email || !password) {
      setEmailError(!email);
      setPasswordError(!password);
      return;
    }

    setEmailError(false);
    setPasswordError(false);

    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        console.log(user);
        navigation.navigate('BottomTab');
      })
      .catch(error => {
        Alert.alert('Error', 'Email/Contraseña incorrectos');
        
      });
  };

  return (
    <View style={styles.container}>
      <Image source={require('../img/fondo.jpg')} style={styles.image} />
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={styles.login}>
          <Image source={require('../img/logo.jpeg')} style={styles.perfil} />
          <View>
            <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>
              Email
            </Text>
            <TextInput
              onChangeText={text => setEmail(text)}
              value={email}
              style={[styles.input, {borderColor: emailError ? 'red' : '#fff'}]}
              placeholder="agustin@gmail.com"
            />
          </View>
          <View>
            <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>
              Contraseña
            </Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                onChangeText={text => setPassword(text)}
                value={password}
                style={[
                  styles.input,
                  {borderColor: passwordError ? 'red' : '#fff'},
                ]}
                placeholder="Contraseña"
                secureTextEntry={secureTextEntry}
              />

              <TouchableOpacity
                style={styles.eyeIconContainer}
                onPress={togglePasswordVisibility}>
                <FontAwesomeIcon
                  icon={secureTextEntry ? faEyeSlash : faEye}
                  size={20}
                  color="#00CFEB90"
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={handleSignIn}
            style={[styles.button, {backgroundColor: '#00CFEB90'}]}>
            <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>
              Ingresar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleCreateAccount}
            style={[styles.button, {backgroundColor: '#6792F090'}]}>
            <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>
              Crear usuario
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  login: {
    width: 370,
    height: 650,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 95,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  perfil: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 1,
    marginVertical: 30,
  },
  input: {
    width: 300,
    height: 45,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ffffff90',
    marginBottom: 20,
  },
  button: {
    width: 270,
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    borderColor: '#fff',
    borderWidth: 1,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 10,
  },
});

export default LoginScreen;
