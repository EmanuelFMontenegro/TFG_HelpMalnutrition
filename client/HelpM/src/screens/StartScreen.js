import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';

const StartScreen = ({navigation}) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('LoginScreen');
    }, 1000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}>
      <Image
        source={require('../img/logo.jpeg')}
        style={{
          width: '100%',
          height: '100%',
          resizeMode: 'contain',
        }}
      />
      <Text
        style={{
          position: 'absolute',
          bottom: 20,
          fontSize: 12,
          color: 'gray',
        }}>
        © 2023 EMDesign. Todos los derechos reservados.
      </Text>
    </View>
  );
};

export default StartScreen;
