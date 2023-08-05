import React, {useState, useRef} from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Platform} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {MaskedView} from '@react-native-community/masked-view';
import Svg, {Polygon} from 'react-native-svg';

const FaceDetection = () => {
  const [detectedFaces, setDetectedFaces] = useState([]);
  const [cameraType, setCameraType] = useState('front');
  const cameraRef = useRef(null);

  const handleFacesDetected = ({faces}) => {
    console.log('Detected faces:', faces);
    setDetectedFaces(faces);
  };

  const toggleCameraType = () => {
    setCameraType(prevCameraType =>
      prevCameraType === 'front' ? 'back' : 'front',
    );
  };

  const renderFaces = () => {
    if (detectedFaces.length === 0) return null;
    return detectedFaces.map((face, index) => (
      <View
        key={index}
        style={[
          styles.faceRectangle,
          {
            top: face.bounds.origin.y,
            left: face.bounds.origin.x,
            width: face.bounds.size.width,
            height: face.bounds.size.height,
          },
        ]}
      />
    ));
  };

  const renderMask = face => {
    if (!face || !face.landmarks) return null;

    const points = face.landmarks
      .map(landmark => `${landmark.x},${landmark.y},${landmark.z}`)
      .join(' ');

    return (
      <MaskedView
        style={styles.mask}
        maskElement={
          <Svg
            height="100%"
            width="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none">
            <Polygon points={points} fill="white" />
          </Svg>
        }>
        <View style={styles.maskedContainer} />
      </MaskedView>
    );
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.camera}
        type={cameraType}
        onFacesDetected={handleFacesDetected}
        faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
        faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.accurate}
        faceDetectionClassifications={
          Platform.OS === 'ios'
            ? RNCamera.Constants.FaceDetection.Classifications.all
            : RNCamera.Constants.FaceDetection.Classifications.none
        }
      />
      {renderFaces()}
      {detectedFaces.length > 0 && renderMask(detectedFaces[0])}

      <TouchableOpacity style={styles.toggleButton} onPress={toggleCameraType}>
        <Text style={styles.toggleButtonText}>Cambiar cámara</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  camera: {
    flex: 1,
  },
  faceRectangle: {
    position: 'absolute',
    borderColor: 'red',
    borderWidth: 2,
    borderRadius: 5,
  },
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  maskedContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  toggleButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
  },
  toggleButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default FaceDetection;
