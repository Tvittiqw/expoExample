import { StyleSheet, View, Text, Image, ActivityIndicator, Pressable, TouchableOpacity, FlatList } from 'react-native';

export default GenresList = ({listItem}) => {
    return (
        <View style={{}}>
            <FlatList 
                data={listItem.genres}
                contentContainerStyle={{paddingRight:70}}
                showsHorizontalScrollIndicator={false}
                horizontal={true} 
                renderItem={({item}) => <Genre genre={item}/>}
            />
        </View>
    )
}

const Genre = ({genre}) => {
    return (
        <View style={styles.genreWrapper}>
            <Text style={styles.genreTitle}>{genre}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    genreWrapper: {
        marginRight: 8,
    },
    genreTitle: {
        color: '#fff',
    }
  });