import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBaby} from '@fortawesome/free-solid-svg-icons';
import {faUser, faClipboard} from '@fortawesome/free-solid-svg-icons';
import {faCamera} from '@fortawesome/free-solid-svg-icons';
import DatosBebeScreen from '../screens/DatosBebeScreen';
import CarnetVacunacionScreen from '../screens/CarnetVacunacionScreen';
import FaceDetection from '../components/FaceDetection';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {useCerrarSesion} from '../controller/CerrarSesion';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const CustomHeader = ({onPress}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.hamburgerIcon}>
          <Text style={styles.hamburgerText}>=</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const CustomDrawerContent = ({navigation}) => {
  const {setLoggedIn} = useCerrarSesion();

  const handleLogout = () => {
    console.log('Usuario deslogeado');
    setLoggedIn(false);
    navigation.reset({
      index: 0,
      routes: [{name: 'LoginScreen'}],
    });
  };

  return (
    <View style={styles.drawerContent}>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.drawerItemText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="HelpMalnutrition" component={BottomTab} />
    </Drawer.Navigator>
  );
};

const BottomTab = ({navigation}) => {
  const {setLoggedIn} = useCerrarSesion();

  const handleLogout = () => {
    console.log('Usuario deslogeado');
    setLoggedIn(false);
    navigation.reset({
      index: 0,
      routes: [{name: 'LoginScreen'}],
    });
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: [
          {
            display: 'flex',
          },
          null,
        ],
        tabBarActiveTintColor: '#1976D2',
      }}>
      <Tab.Screen
        name="Datos de Bebé"
        component={DatosBebeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon={faBaby} color="#00CFEB" size={24} />
          ),
          tabBarLabel: 'Cuestionario Paciente',
          headerTitle: 'Cuestionario de Evaluacion y Visita',
        }}
      />

      <Tab.Screen
        name="Vacunas"
        component={CarnetVacunacionScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon={faClipboard} color="#00CFEB" size={24} />
          ),
          tabBarLabel: 'Carnet digital',
          headerTitle: 'Carnet de Vacunación',
        }}
      />
      <Tab.Screen
        name="Detección"
        component={FaceDetection}
        options={({navigation}) => ({
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon={faCamera} size={24} color="#00CFEB" />
          ),
          tabBarLabel: 'Detección Facial',
          headerTitle: 'Detección Facial',
        })}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  hamburgerIcon: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hamburgerText: {
    fontSize: 24,
  },
  drawerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerItemText: {
    fontSize: 20,
    color: '#00CFEB',
    padding: 10,
  },
});

export default DrawerNavigator;
