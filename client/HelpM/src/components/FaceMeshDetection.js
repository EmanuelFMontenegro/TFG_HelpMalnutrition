import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {FaceMesh} from 'react-native-facemesh';

const FaceMeshDetection = () => {
  const [mesh, setMesh] = useState(null);

  const handleMesh = meshData => {
    setMesh(meshData);
  };

  return (
    <View style={styles.container}>
      <FaceMesh style={styles.camera} onMesh={handleMesh} />
      {mesh && (
        <>
          
          {mesh.points.map((point, index) => (
            <View
              key={index}
              style={[styles.facePoint, {top: point.y, left: point.x}]}
            />
          ))}
        </>
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
  facePoint: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'red',
  },
});

export default FaceMeshDetection;
