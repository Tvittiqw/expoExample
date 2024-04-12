import { useState, useRef, useEffect } from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    Image, 
    ActivityIndicator, 
    Pressable, 
    TouchableOpacity, 
    Animated, UIManager, Platform, LayoutAnimation } from 'react-native';
  import {useCardAnimation} from '@react-navigation/stack';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

export default AnimeDetails = ({route, navigation}) => {
    const {item, itemOffset} = route?.params
    const listItem = item;
    const {next, current} = useCardAnimation();
    const [height, setHeight] = useState(100);

    const changeHeight = (newHeight) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        setHeight(newHeight);
     }


    const iconURL = listItem.coverImage.medium
    
    
    const handlePress = () => {

    }

    
    return (
            <Animated.View style={[styles.listItem, 
                    {transform: 
                        [{translateY: current.progress.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [itemOffset, 0],
                                    extrapolate: 'clamp',
                                })
                            }
                        ],
                            // [{translateY: itemOffset}],
                    }
                    ]}>
                        <TouchableOpacity style={{height : height, width : 300, backgroundColor : "red"}}
                            onPress={() => changeHeight(500)}
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
                        </View>
                    </TouchableOpacity> 
            </Animated.View>
    )
}

const styles = StyleSheet.create({
    listItem: {
        // flex: 1,
        // minHeight: 70,
        padding: 5,
        flexDirection: 'row',
        backgroundColor: 'green'
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
    }
  });
  