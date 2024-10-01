import { Dimensions, FlatList, View } from "react-native";
import ListItem, { ListItemWidth } from "./listItem";
import { useSharedValue } from "react-native-reanimated";

const {width} = Dimensions.get("screen");

export default function CircularCarousel({data,onChange}){

    const contentOffset = useSharedValue(0);
        

    return (
            <FlatList
            data={data}
            keyExtractor={(_,index)=>index.toString()}
                scrollEventThrottle={8}
                snapToInterval={ListItemWidth}
                
                decelerationRate="fast"
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={(event)=>{
                    contentOffset.value = event.nativeEvent.contentOffset.x;
                    const activeIndex = Math.round(contentOffset.value/ListItemWidth);

                    onChange && onChange(activeIndex);
                }}

                style={{width:width}}
                
                contentContainerStyle={{
                    alignItems:"flex-end",
                    // justifyContent:"center",
                    paddingHorizontal: 2 * ListItemWidth,
                    paddingBottom:18,

                }}
                horizontal
                renderItem={({item,index})=>{
                    return ( <ListItem src={item} index={index} contentOffset={contentOffset}/>)
                }}
            />
    )
}