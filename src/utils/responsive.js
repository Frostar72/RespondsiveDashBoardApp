import { Dimensions, PixelRatio, Platform } from 'react-native';

// Get screen dimensions
let screenData = Dimensions.get('window');

// Function to check if the device is a tablet
export const isTablet = () => {
  const { width, height } = screenData;
  const screenDiagonal = Math.sqrt(width * width + height * height) / PixelRatio.getFontScale();
  // A common threshold for tablets is a diagonal size of 7 inches or more.
  // We'll use a pixel value that roughly corresponds to this, but this may need adjustment.
  return screenDiagonal >= 1000;
};

// Screen breakpoints
export const breakpoints = {
  small: 350,
  medium: 400,
  large: 500,
};

// Device type detection
export const getDeviceType = () => {
  if (isTablet()) {
    return 'tablet';
  }
  const { width } = screenData;
  if (width < breakpoints.small) return 'small';
  if (width < breakpoints.medium) return 'medium';
  return 'large';
};

// Responsive width percentage
export const wp = percentage => {
  const value = (percentage * screenData.width) / 100;
  return Math.round(PixelRatio.roundToNearestPixel(value));
};

// Responsive height percentage
export const hp = percentage => {
  const value = (percentage * screenData.height) / 100;
  return Math.round(PixelRatio.roundToNearestPixel(value));
};

// Responsive font size
export const rf = size => {
  const scale = screenData.width / 320;
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

// Get orientation based on screen dimensions
export const getOrientation = () => {
  const { width, height } = Dimensions.get('window');
  return width < height ? 'portrait' : 'landscape';
};

// Grid columns based on device type and orientation
export const getGridColumns = () => {
  const deviceType = getDeviceType();
  const orientation = getOrientation();

  if (deviceType === 'tablet') {
    return 4;
  } else {
    // Phone
    switch (deviceType) {
      case 'small':
        return orientation === 'portrait' ? 2 : 2;
      case 'medium':
        return orientation === 'portrait' ? 2 : 3;
      case 'large':
        return orientation === 'portrait' ? 2 : 4;
      default:
        return 2;
    }
  }
};

// Update screen data on orientation change
export const updateScreenData = newScreenData => {
  screenData = newScreenData.window;
};

// Listen for orientation changes
export const listenForOrientationChange = callback => {
  const subscription = Dimensions.addEventListener('change', newScreenData => {
    updateScreenData(newScreenData);
    callback({
      ...newScreenData.window,
      orientation: getOrientation(),
    });
  });
  return subscription;
};

// Responsive spacing
export const spacing = {
  xs: wp('1%'),
  sm: wp('2%'),
  md: wp('4%'),
  lg: wp('6%'),
  xl: wp('8%'),
};

// Responsive typography
export const typography = {
  h1: rf(28),
  h2: rf(24),
  h3: rf(20),
  h4: rf(18),
  body: rf(16),
  caption: rf(14),
  small: rf(12),
};

// Get adaptive padding based on device type
export const getAdaptivePadding = () => {
  const deviceType = getDeviceType();
  switch (deviceType) {
    case 'small':
      return spacing.md;
    case 'medium':
      return spacing.md;
    case 'large':
      return spacing.lg;
    case 'tablet':
      return spacing.xl;
    default:
      return spacing.xl;
  }
};