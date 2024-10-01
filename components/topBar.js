import { Dimensions, FlatList, Image, StyleSheet, Text, View } from "react-native";
import CircularCarousel from "./circularCarousel";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import Animated, {  interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
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

  const activeIndex = useSharedValue(0);
  const flatListRef = useRef(null);

  const onCarouselChange = (index) => {
    activeIndex.value = index;
    flatListRef.current?.scrollToIndex({ index, animated: false });
  };

  function RenderItem({item,index}){
    const animatedStyle = useAnimatedStyle(() => {
      const scale = activeIndex.value === index ? 1 : 0; 
      const opacity = activeIndex.value === index ? 1 : 0; 
      return {
        transform: [{ scale: withTiming(scale) }],
        opacity: withTiming(opacity),
      };
    });

    return (
      <Animated.View style={[{width:150,height:150,backgroundColor:"#ffe4b5",justifyContent:"center",alignItems:"center",borderRadius:75},animatedStyle]}>
        <Image source={item} style={{
          borderRadius:75,
          width:"100%",
          height:"100%",
      }} />  
      </Animated.View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark"/>
      <View  style={[styles.upperLayer]}>
        <FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(_,index)=>index.toString()}
        scrollEnabled={false}
        style={{width:150,height:150}}
        contentContainerStyle={{alignItems:"center",justifyContent:"center",paddingHorizontal:2*ListItemWidth}}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item,index}) => <RenderItem item={item} index={index} />}
        />  
      </View>
      <View style={styles.lowerLayer}>
        <CircularCarousel data={data} onChange={onCarouselChange}/>
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
