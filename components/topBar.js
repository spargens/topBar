import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import CircularCarousel from "./circularCarousel";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import Animated, {  interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { ListItemWidth } from "./listItem";


const data = [
  require('../assets/00.jpg'),
  require('../assets/01.jpg'),
  require('../assets/02.jpg'),
  require('../assets/03.jpg'),
  require('../assets/04.jpg'),
  require('../assets/05.jpg'),
  require('../assets/06.jpg'),
  require('../assets/07.jpg'),
  require('../assets/08.jpg'),
  require('../assets/09.jpg'),
]

const {width,height} = Dimensions.get("window");

export default function TopBar(){

  const [activeIndex,setActiveIndex] = useState(0);
  const activeIndexValue = useSharedValue(0);
  const rotationValue = useSharedValue(0);
  const scaleValue = useSharedValue(1); 
  const opacityValue = useSharedValue(1); 

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotationValue.value}deg` },
        { scale: scaleValue.value }
      ],
      opacity: opacityValue.value,
    };
  });

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;

    const distanceScrolled = contentOffset.x - (activeIndex * ListItemWidth);

    rotationValue.value = distanceScrolled * 5;


    const targetScale = interpolate(
      Math.abs(distanceScrolled),
      [0, ListItemWidth],
      [1, 0],
      { extrapolate: 'clamp' }
    );

    scaleValue.value = withSpring(targetScale, { damping: 5, stiffness: 100 }); 


    opacityValue.value = interpolate(
      Math.abs(distanceScrolled*2),
      [0, ListItemWidth],
      [1, 0]
    );
  };
 

  return (
    <View style={styles.container}>
      <StatusBar style="dark"/>
      <Animated.View  style={[styles.upperLayer]}>
        <Animated.View style={[{width:150,height:150,backgroundColor:"#ffe4b5",justifyContent:"center",alignItems:"center",borderRadius:75},animatedStyle]}>
          <Image source={data[activeIndex]} style={{
                borderRadius:75,
                width:"100%",
                height:"100%",
            }} />  
        </Animated.View>  
      </Animated.View>
      <View style={styles.lowerLayer}>
        <CircularCarousel data={data} onActiveIndexChange={(index) => {
            setActiveIndex(index); 
            activeIndexValue.value = index; 
            rotationValue.value = withSpring(360, { damping: 1, stiffness: 100 });
          }} onScroll={handleScroll} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height:height*0.43,
    backgroundColor: '#fff',
    alignItems:"center"
  },
  upperLayer: {
    position: 'absolute',
    top: 0,
    width: width*1.2,
    height: height * 0.3,
    backgroundColor: '#303442', 
    borderBottomLeftRadius: width,
    borderBottomRightRadius: width,
    zIndex:1,
    alignItems:"center",
    justifyContent:"center"
  },
  lowerLayer: {
    position: 'absolute',
    top: height * 0.03,
    width: width*1.3,
    height: height * 0.4,
    backgroundColor: '#2d2e3f',
    borderBottomLeftRadius: width,
    borderBottomRightRadius: width,
    alignItems:"center"
  },
});
