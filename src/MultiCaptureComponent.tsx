import type { FC } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

type MultiProps = {
  secret: string;
  getImage: (data: any) => void;
  onClose: () => void;
  onTimeout: () => void;
};

const MultiCaptureComponent: FC<MultiProps> = ({
  secret,
  onClose,
  onTimeout,
  getImage,
}) => {
  return (
    <View style={{ flex: 1, zIndex: 20, margin: 18 }}>
      <WebView
        onLoadStart={() => {}}
        onLoadEnd={() => {}}
        style={{ flex: 1 }}
        source={{
          uri: 'https://multiid-sdk-web-437894375097.southamerica-east1.run.app/capture',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          body: JSON.stringify({ secret }),
        }}
        originWhitelist={['*']}
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback
        javaScriptEnabled
        onMessage={(event) => {
          const data = JSON.parse(event.nativeEvent.data);
          if (data && data.type === 'success') {
            getImage && getImage(data);
            onClose();
          }
          if (data && data.source === 'go-saffe-capture') {
            switch (data.payload.event) {
              case 'close':
                if (onClose) {
                  onClose();
                }
                break;
              case 'timeout':
                if (onTimeout) {
                  onTimeout();
                }
                break;
            }
          }
        }}
      ></WebView>
    </View>
  );
};

export default MultiCaptureComponent;
