import { Dimensions, StyleSheet, Text, View } from "react-native";
import CircularCarousel from "./components/circularCarousel";
import Svg, { Circle, ClipPath, Defs, G, Path, Rect } from 'react-native-svg';
import { StatusBar } from "expo-status-bar";
import LinearGradient from "react-native-linear-gradient";


const data = [
  require('./assets/00.jpg'),
  require('./assets/01.jpg'),
  require('./assets/02.jpg'),
  require('./assets/03.jpg'),
  require('./assets/04.jpg'),
  require('./assets/05.jpg'),
  require('./assets/06.jpg'),
  require('./assets/07.jpg'),
  require('./assets/08.jpg'),
  require('./assets/09.jpg'),
]

const {width,height} = Dimensions.get("window");

export default function App(){
  return (
    <View style={styles.container}>
      <StatusBar style="dark"/>
      <View style={styles.upperLayer} />
      <View style={styles.lowerLayer}>
        <CircularCarousel data={data} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Main background color
    alignItems:"center"
  },
  upperLayer: {
    position: 'absolute',
    top: 0,
    width: width*1.2,
    height: height * 0.3,
    backgroundColor: '#303442', // Color of the upper layer
    borderBottomLeftRadius: width,
    borderBottomRightRadius: width,
    zIndex:1
  },
  lowerLayer: {
    position: 'absolute',
    top: height * 0.03,
    width: width*1.3,
    height: height * 0.4,
    backgroundColor: '#2d2e3f', // Color of the lower layer
    borderBottomLeftRadius: width,
    borderBottomRightRadius: width,
    alignItems:"center"
  },
});
