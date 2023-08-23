import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Svg, {Circle, Path, Rect} from 'react-native-svg';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const FaceDetectionScreen = () => {
  const [faces, setFaces] = useState([]);
  const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.front);

  const toggleCameraType = () => {
    setCameraType(prevType =>
      prevType === RNCamera.Constants.Type.front
        ? RNCamera.Constants.Type.back
        : RNCamera.Constants.Type.front,
    );
  };
  const handleFaceDetected = faceArray => {
    setFaces(faceArray.faces);
    console.log('Detected faces:', faceArray.faces);
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.camera}
        type={cameraType}
        onFacesDetected={handleFaceDetected}
        faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.fast}
        faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
      />
      <TouchableOpacity style={styles.cameraToggle} onPress={toggleCameraType}>
        <Svg
          width={40}
          height={40}
          viewBox="0 0 512 512"
          style={styles.rotatedIcon}>
          <Path
            d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"
            fill="#43e5da"
          />
        </Svg>
      </TouchableOpacity>

      <Svg style={StyleSheet.absoluteFill}>
        {faces.map(face => (
          <React.Fragment key={face.faceID}>
            <Rect
              x={face.bounds.origin.x}
              y={face.bounds.origin.y}
              width={face.bounds.size.width}
              height={face.bounds.size.height}
              fill="transparent"
              stroke="red"
              strokeWidth="2"
            />
            <Circle
              cx={face.leftEyePosition.x}
              cy={face.leftEyePosition.y}
              r={5}
              fill="white"
            />
            <Circle
              cx={face.rightEyePosition.x}
              cy={face.rightEyePosition.y}
              r={5}
              fill="white"
            />
            <Path
              d={`M ${face.leftEyePosition.x},${face.leftEyePosition.y} L ${face.rightEyePosition.x},${face.rightEyePosition.y}`}
              stroke="white"
            />
            <Circle
              cx={face.noseBasePosition.x}
              cy={face.noseBasePosition.y}
              r={5}
              fill="white"
            />
            <Circle
              cx={face.leftMouthPosition.x}
              cy={face.leftMouthPosition.y}
              r={5}
              fill="white"
            />
            <Circle
              cx={face.rightMouthPosition.x}
              cy={face.rightMouthPosition.y}
              r={5}
              fill="white"
            />
            <Path
              d={`M ${face.leftMouthPosition.x},${face.leftMouthPosition.y} L ${face.rightMouthPosition.x},${face.rightMouthPosition.y}`}
              stroke="white"
            />

            {face.landmarks && (
              <React.Fragment>
                <Circle
                  cx={face.landmarks.leftEyebrowLeftEdge.x}
                  cy={face.landmarks.leftEyebrowLeftEdge.y}
                  r={5}
                  fill="red"
                />
                <Circle
                  cx={face.landmarks.leftEyebrowRightEdge.x}
                  cy={face.landmarks.leftEyebrowRightEdge.y}
                  r={5}
                  fill="red"
                />
                <Circle
                  cx={face.landmarks.rightEyebrowLeftEdge.x}
                  cy={face.landmarks.rightEyebrowLeftEdge.y}
                  r={5}
                  fill="red"
                />
                <Circle
                  cx={face.landmarks.rightEyebrowRightEdge.x}
                  cy={face.landmarks.rightEyebrowRightEdge.y}
                  r={5}
                  fill="red"
                />
                <Circle
                  cx={face.landmarks.leftEarTragus.x}
                  cy={face.landmarks.leftEarTragus.y}
                  r={5}
                  fill="red"
                />
                <Circle
                  cx={face.landmarks.rightEarTragus.x}
                  cy={face.landmarks.rightEarTragus.y}
                  r={5}
                  fill="white"
                />
              </React.Fragment>
            )}
          </React.Fragment>
        ))}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraToggle: {
    position: 'absolute',
    top: 550,
    right: 175,
    zIndex: 10,
  },
  rotatedIcon: {
    color: '#00CFEB',
    fontSize: 30,
    transform: [{rotate: '45deg'}],
  },
});

export default FaceDetectionScreen;
