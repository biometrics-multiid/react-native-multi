import { useCallback, useState } from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { MultiCaptureComponent } from 'react-native-multi';

export default function App() {
  const [image, setImage] = useState('');
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onClose = useCallback(() => {
    setVisible(false);
  }, []);

  const onReset = useCallback(() => {
    setImage('');
    setVisible(true);
  }, []);

  return (
    <View style={styles.container}>
      {visible && (
        <View style={{ flex: 1, opacity: isLoading ? 0 : 1 }}>
          <MultiCaptureComponent
            onLoadStart={() => setIsLoading(true)}
            onLoadEnd={() => setIsLoading(false)}
            secret="67E9730E54154A079DA26C999D3880AA"
            getImage={(data) => {
              setImage(data.base64);
            }}
            onClose={onClose}
            onTimeout={() => {}}
          ></MultiCaptureComponent>
        </View>
      )}

      {!visible && (
        <TouchableOpacity
          style={{
            backgroundColor: '#50c95b',
            padding: 12,
            borderRadius: 5,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
          }}
          onPress={() => setVisible(true)}
        >
          <Text style={{ color: 'white', fontSize: 18 }}>Iniciar</Text>
        </TouchableOpacity>
      )}

      {isLoading && (
        <ActivityIndicator
          size="large"
          color="#00ff00"
          style={{
            width: 100,
            height: 100,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
          }}
        />
      )}

      {image[0] && (
        <View
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
            zIndex: 5,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <Image
            source={{ uri: 'data:image/png;base64,' + image }}
            style={{
              width: 300,
              height: 300,
              borderRadius: 8,
            }}
          ></Image>

          <TouchableOpacity
            style={{
              backgroundColor: '#50c95b',
              padding: 12,
              borderRadius: 5,
            }}
            onPress={() => onReset()}
          >
            <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>
              Tentar Novamente
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
