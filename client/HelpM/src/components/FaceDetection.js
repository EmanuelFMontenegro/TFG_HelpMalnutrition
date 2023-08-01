import React, {useState, useRef} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {RNCamera} from 'react-native-camera';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const FaceDetection = () => {
  const [type, setType] = useState(RNCamera.Constants.Type.front);
  const [faceMeasurements, setFaceMeasurements] = useState(null);
  const cameraRef = useRef(null);

  const handleFaceDetected = ({faces}) => {
    if (faces.length > 0) {
      const face = faces[0];
      const {bounds} = face;

      const measurements = {
        width: bounds.size.width,
        height: bounds.size.height,
        x: bounds.origin.x,
        y: bounds.origin.y,
      };

      setFaceMeasurements(measurements);
    } else {
      setFaceMeasurements(null);
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.camera}
        type={type}
        captureAudio={false}
        onFacesDetected={handleFaceDetected}
        faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
        faceDetectionClassifications={
          RNCamera.Constants.FaceDetection.Classifications.all
        }
      />

      {faceMeasurements && (
        <View
          style={[
            styles.bound,
            {
              width: faceMeasurements.width,

              height: faceMeasurements.height,

              left: faceMeasurements.x,

              top: faceMeasurements.y,
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  camera: {
    flex: 1,
  },
  bound: {
    position: 'absolute',
    borderWidth: 5,
    borderColor: '#00CFEB',
    zIndex: 3000,
  },
});

export default FaceDetection;
