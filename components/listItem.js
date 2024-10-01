import { Dimensions, Image, View } from "react-native";
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from "react-native-reanimated";


const {width} = Dimensions.get("window");

export const ListItemWidth = width/5;

export default function ListItem({src,index,contentOffset}){
    const animatedStyle = useAnimatedStyle(()=>{
        const inputRange = [
            (index - 2) * ListItemWidth,
            (index - 1) * ListItemWidth,
            index * ListItemWidth,
            (index + 1) * ListItemWidth,
            (index + 2) * ListItemWidth,
          ];
      
          const translateYOutputRange =  [-ListItemWidth-8, -ListItemWidth / 3, 0,-ListItemWidth / 3, -ListItemWidth-8]
          const translateXOutputRange = [ListItemWidth / 3, ListItemWidth / 4, 0, -ListItemWidth/4, -ListItemWidth / 3];
      
          const opacityOutputRange = [0.7, 0.9, 1, 0.9, 0.7];
      
          const scaleOutputRange = [0.9, 0.9, 1, 0.9, 0.9];
      
          const translateY = interpolate(
            contentOffset.value,
            inputRange,
            translateYOutputRange,
            Extrapolation.CLAMP
          );

          const translateX = interpolate(
            contentOffset.value,
            inputRange,
            translateXOutputRange,
            Extrapolation.CLAMP
        );
      
          const opacity = interpolate(
            contentOffset.value,
            inputRange,
            opacityOutputRange,
            Extrapolation.CLAMP
          );
      
          const scale = interpolate(
            contentOffset.value,
            inputRange,
            scaleOutputRange,
            Extrapolation.CLAMP
          );
      
          return {
            opacity,
            transform: [
              {
                translateY
              },
              {
                translateX
              },
              {
                scale,
              },
            ],
          };
    })

    return (
        <Animated.View style={[{
            width:ListItemWidth,
            height:ListItemWidth,
            // aspectRatio:1,
            borderRadius:50,
            // borderWidth:1
        },animatedStyle]}>
            <Image source={src} style={{
                borderRadius:50,
                width:"100%",
                height:"100%",
                borderWidth:1,
            }} />
        </Animated.View>
    )
}