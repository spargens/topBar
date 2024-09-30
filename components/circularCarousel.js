import { Dimensions, FlatList, View } from "react-native";
import ListItem, { ListItemWidth } from "./listItem";
import { useSharedValue } from "react-native-reanimated";

const {width} = Dimensions.get("screen");

export default function CircularCarousel({data}){

    const contentOffset = useSharedValue(0);


    return (
            <FlatList
            data={data}
            keyExtractor={(_,index)=>index.toString()}
                scrollEventThrottle={16}
                snapToInterval={ListItemWidth}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={(event)=>{
                    contentOffset.value = event.nativeEvent.contentOffset.x
                }}

                style={{width:width}}
                
                contentContainerStyle={{
                    alignItems:"flex-end",
                    // justifyContent:"center",
                    paddingHorizontal: 2 * ListItemWidth,
                    paddingBottom:4

                }}
                horizontal
                renderItem={({item,index})=>{
                    return ( <ListItem src={item} index={index} contentOffset={contentOffset}/>)
                }}
            />
    )
}