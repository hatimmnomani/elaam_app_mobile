import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import { prizePageTheme } from '../theme/prizePageTheme';

const ReligiousGatheringImage = ({ imageSource }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showZoomModal, setShowZoomModal] = useState(false);
  const [zoomedImageDimensions, setZoomedImageDimensions] = useState({
    width: 300,
    height: 300,
  });
  const [rotation, setRotation] = useState(0); // 0, 90, 180, 270 degrees
  const [lastTap, setLastTap] = useState(0);

  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTap < 300) {
      // 300ms for double tap
      handleRotate();
    }
    setLastTap(now);
  };

  // Default fallback image
  const defaultImage = require('../assets/gathering.png');

  // Determine the actual image source
  const actualImageSource =
    imageError || !imageSource ? defaultImage : imageSource;

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleZoomPress = () => {
    setShowZoomModal(true);
  };

  const handleCloseZoom = () => {
    setShowZoomModal(false);
  };

  // Debug: Log the image source for troubleshooting
  console.log('Zoom Image Source:', actualImageSource);

  const handleZoomedImageLoad = event => {
    const { width, height } = event.nativeEvent.source;
    console.log('Zoomed image loaded:', { width, height });
    setZoomedImageDimensions({ width, height });
  };

  const handleRotate = () => {
    setRotation(prevRotation => (prevRotation + 90) % 360);
  };

  return (
    <>
      {/* Main Image Container */}
      <View style={styles.imageContainer}>
        <TouchableOpacity
          onPress={handleZoomPress}
          style={styles.touchableContainer}
        >
          <Image
            source={actualImageSource}
            style={styles.image}
            resizeMode="cover"
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
          {/* Zoom Icon Overlay */}
          <View style={styles.zoomIconContainer}>
            <Text style={styles.zoomIcon}>🔍</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Zoom Modal */}
      <Modal
        visible={showZoomModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseZoom}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={handleCloseZoom}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.modalRotateButton}
            onPress={handleRotate}
          >
            <Text style={styles.rotateButtonText}>↻</Text>
          </TouchableOpacity>

          <ReactNativeZoomableView
            style={styles.zoomableContainer}
            maxZoom={5}
            minZoom={1}
            zoomStep={0.5}
            initialZoom={1}
            bindToBorders={true}
          >
            {!imageError ? (
              <TouchableOpacity onPress={handleDoubleTap} activeOpacity={1}>
                <Image
                  source={actualImageSource}
                  style={[
                    styles.zoomedImage,
                    {
                      width: zoomedImageDimensions.width,
                      height: zoomedImageDimensions.height,
                      transform: [{ rotate: `${rotation}deg` }],
                    },
                  ]}
                  resizeMode="contain"
                  onLoad={handleZoomedImageLoad}
                  onError={error => {
                    console.log('Zoom image error:', error);
                    setImageError(true);
                  }}
                />
              </TouchableOpacity>
            ) : (
              <View style={styles.zoomFallbackContainer}>
                <Text style={styles.zoomFallbackText}>Image not available</Text>
                <Text style={styles.zoomFallbackSubtext}>
                  Please check your connection
                </Text>
              </View>
            )}
          </ReactNativeZoomableView>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    marginVertical: 20,
    marginHorizontal: 20,
    borderRadius: prizePageTheme.borderRadius.image,
    overflow: 'hidden',
    ...prizePageTheme.shadows.card,
  },
  touchableContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: prizePageTheme.borderRadius.image,
  },
  zoomIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomIcon: {
    fontSize: 20,
    color: '#ffffff',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 50,
    right: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  modalRotateButton: {
    position: 'absolute',
    top: 50,
    right: 90, // Positioned next to close button
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  rotateButtonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  zoomedImage: {
    width: undefined,
    height: undefined,
    aspectRatio: 1, // This will be overridden by onLoad
    maxWidth: '100%',
    maxHeight: '100%',
    resizeMode: 'contain',
  },
  zoomFallbackContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  zoomFallbackText: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
  },
  zoomFallbackSubtext: {
    fontSize: 14,
    color: '#cccccc',
    textAlign: 'center',
    marginTop: 8,
  },
  zoomableContainer: {
    width: '90%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    // Allow for rotated content
    minWidth: 200,
    minHeight: 200,
  },
});

export default ReligiousGatheringImage;
