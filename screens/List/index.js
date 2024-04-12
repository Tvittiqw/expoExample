import { useState, useRef } from 'react';
import { StyleSheet, View, Text, Image, ActivityIndicator, Pressable } from 'react-native';
import {useQuery} from '@apollo/client';
import getAnimeListQuery from '../../graphql/anime/animeListQuery';
import { FlashList } from "@shopify/flash-list";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
  } from 'react-native-reanimated';
import GenresList from '../../components/GenresList';
import { stylesConstants } from '../../constants';
import { springConfig } from '../../constants/animations';
const baseItemHeight = 70
const separatorHeight = 20
const expandedHeight = 270


const countOffset = (index, scrollPosition) =>{ 
    const itemOffset = (baseItemHeight + separatorHeight) * index;
    return itemOffset - scrollPosition;
}


const ListFooter = ({networkStatus}) => {
    if(networkStatus !== 3) return
    return (
        <ActivityIndicator/>
    )
}

const ListItem = ({
    listItem, 
    expanded, 
    handleItemPress, 
    navigation, 
    index, 
    scrollPosition
}) => {
    const itemHeight = useSharedValue(baseItemHeight);


    const handlePress = () => {
            handleItemPress(index)

            if(expanded && expanded === index){
                itemHeight.value = withSpring(baseItemHeight, springConfig);
                handleItemPress(listItem)
            } else {
                itemHeight.value = withSpring(expandedHeight, springConfig);
                handleItemPress(listItem)
            }       
    }       
    
    const handleDetailsPress = () => {
        navigation.navigate('AnimeDetails', {item: listItem, itemOffset: countOffset(index, scrollPosition)})
    }

    const aimatedStyles = useAnimatedStyle(() => ({
            height: itemHeight.value,
        }));

    
    if(!listItem) return 
        const iconURL = listItem.coverImage.medium
        return (
                <Animated.View style={[styles.listItem, aimatedStyles]}>
                    <Pressable style={{
                        flexDirection: 'row',
                    }} 
                        onPress={handlePress}
                    >
                        <Image style={styles.icon} source={{uri: iconURL}}/>
            
                        <View style={styles.itemInfo}>
                            <Text style={styles.title}>
                                {listItem.title.english? listItem.title.english : listItem.title.native}
                            </Text>
                            <GenresList listItem={listItem}/>
                                <View style={{}}>
                                    <Text>I disappear sometimes!</Text>
                                    <Text>I disappear sometimes!</Text>
                                    <Text>I disappear sometimes!</Text>
                                    <Text>I disappear sometimes!</Text>
                                    <Text>I disappear sometimes!</Text>
                                    <Text>I disappear sometimes!</Text>
                                    <Text>I disappear sometimes!</Text>
                                    <Text>I disappear sometimes!</Text>
                                    <Text>I disappear sometimes!</Text>
                                    <Text>I disappear sometimes!</Text>
                                    <Text>I disappear sometimes!</Text>
                                    <Text>I disappear sometimes!</Text>
                                </View>
                                <Pressable style={{
                                    flexDirection: 'row',
                                }} onPress={handleDetailsPress}>
                                    <Text>go to details</Text>
                                </Pressable>
                        </View>
                    </Pressable> 
            </Animated.View>
        )
} 

function List( {refetch, fetchMore, pageData, loading, networkStatus, navigation, setListItemIndex}) {
    const [expanded, setExpanded] = useState(null);
    const [animationEnded, setAnimationEnded] = useState(false)
    const [scrollPosition,setScrollPosition]=useState(0)
    const list = useRef(null);
    
    const handleItemPress = (index) => {

        if(expanded === index){
            setExpanded(null)
        }
        setExpanded(index)
    }

    const refresh = () => {
        refetch()
    }

    const handleLoadMore =  ()  => {
        if (loading || !pageData) return;
        
        try {
            fetchMore({variables: {page: pageData.pageInfo.currentPage + 1, perPage: 15}})
        } catch (e) {
            console.log('error has occured',e)
        }
        
    }

    const handleScroll=(event)=>{
        let yOffset=event.nativeEvent.contentOffset.y / 1;
        setScrollPosition(yOffset)
    }

    if(!pageData.media.length){
        return (
            <View style={styles.listEmptyContainer}>
                <Text>Opps, list is empty...</Text>
            </View>
        )
    }

  return (
    <View style={styles.container}>
        <FlashList
            onScroll={(event)=>handleScroll(event)}
            extraData={[expanded, animationEnded]}
            ref={list}
            keyExtractor={(item) => {
                return item.id.toString();
            }}
            data={pageData.media}
            renderItem={
                ({item, index}) => <ListItem 
                    animationEnded={animationEnded} 
                    navigation={navigation} 
                    listItem={item} 
                    index={index} 
                    handleItemPress={handleItemPress} 
                    expanded={expanded}
                    setAnimationEnded={setAnimationEnded}
                    scrollPosition={scrollPosition}
                />
            }
            estimatedItemSize={100}
            contentContainerStyle={styles.listContentContainer}
            onEndReached={handleLoadMore}
            onRefresh={refresh}
            refreshing={loading}
            ListFooterComponent={
                <ListFooter 
                    networkStatus={networkStatus}
                />
            }
            ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
    </View>
    
  );
}

  export default ListWrapper = ({...props}, {navigation}) => {
    const [dataLoaded, setDataLoaded] = useState(false);
    const {data, error, loading, fetchMore, refetch, networkStatus} = useQuery(
        getAnimeListQuery,
        {
          variables: {page: 1, perPage: 15},
          notifyOnNetworkStatusChange: true,
          onCompleted: () => setDataLoaded(true),
        },
    );

  
    if(!data || !dataLoaded){
        return <View style={styles.container}>
            <ActivityIndicator/>
        </View>
    }


    return <List 
                pageData={data.Page} 
                loading={loading} 
                fetchMore={fetchMore} 
                refetch={refetch} 
                networkStatus={networkStatus}
                navigation={navigation}
                {...props}
            />
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: stylesConstants.pimaryBackground,
        justifyContent: 'center',
    },
    listItem: {
        flex: 1,
        padding: 5,
        flexDirection: 'row',
        backgroundColor: 'green',
        alignSelf: 'center',
        width: '100%'
    },
    icon: {
        height: 50,
        width: 50,
        borderRadius: 30,
        marginRight: 8
    },
    itemInfo: {
        flexDirection: 'column'
    },
    title: {
        color: '#fff'
    },
    genreWrapper: {
        marginRight: 8,
    },
    genreTitle: {
        color: '#fff',
    },
    separator: {
        height: separatorHeight
    },
    listContentContainer: {
        backgroundColor: stylesConstants.pimaryBackground
    },
    listEmptyContainer: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    }
  });