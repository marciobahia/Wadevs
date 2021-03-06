import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import  MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import api from '../services/api';
import socket, { connect } from '../services/socket';

function Main({ navigation }){
    const [ devs, setDevs ] = useState([]);
    const [currentRegion, setCurrentRegion ] = useState(null);
    const [techs, setTechs] = useState('');
    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } =await requestPermissionsAsync();
            if (granted) {
                const {coords}= await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const { latitude, longitude } = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta:0.04 ,
                    longitudeDelta: 0.04,
                })
            }
        }
        loadInitialPosition();
    }, []);

    function setupWebsocket() {
        const { latitude, longitude } = currentRegion;
        connect(
            latitude,
            longitude,
            techs,
        );
    };

    async function loadDevs() {
        const { latitude, longitude } = currentRegion;

        const response = await api.get('/search', {
            params: {
            latitude,
            longitude,
            techs
        }
        });

        setDevs(response.data.devs);
        setupWebsocket();
      
    }
    function handleRegionChanged(region) {
        setCurrentRegion(region);
    }

    if (!currentRegion) {
        return null;
    }
    return (
        <>
    <MapView onRegionChangeComplete={handleRegionChanged}
     initialRegion={currentRegion}
     style={styles.map}
     >
        
    {devs.map(dev => (
        <Marker
        key={dev._id}
        coordinate={ { 
            longitude: dev.location.coordinates[0],
            latitude: dev.location.coordinates[1],
             }} 
             >
            <Image 
            style={styles.avatar} 
            source={{ uri:dev.avatar_url }}
            />

        <Callout onPress={() => {
            navigation.navigate('Profile', { github_username: dev.github_username});
        }}>
        <View style={styles.callout}>
        <Text style={styles.devName}>{dev.name}</Text>
        <Text style={styles.devBio}>{dev.bio}</Text>
    <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
        </View>
        </Callout>
        </Marker>
    ))}
    </MapView>
        <View style={styles.searchForm}>
        <TextInput 
        style={styles.searchInput}
        placeholder="Buscar Devs por Tecnologia "
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false}
        value={techs}
        onChangeText={setTechs}

        />

        <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
        <MaterialIcons name="my-location" size={20} color={"rgba(13, 2, 53, 0.671);"}/>

        </TouchableOpacity>
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    map: {
        flex:1
    },
    avatar: {
        width:90,
        height:90,
        borderRadius: 100,
        borderWidth: 4,
        borderColor: '(rgba(56, 56, 134, 0.589);'
    
    },

    callout: {
        width:260,
    },
    devName: {
        fontWeight:'bold',
        fontSize:16,
    },
    devBio: {
        color:'(rgba(13, 2, 53, 0.671);)',
        marginTop: 5,
    },
    devTechs: {
        marginTop:10,
        color:'#d16b0c'
    },

    searchForm: {
        position: 'absolute',
        top:20,
        left:20,
        right:20,
        zIndex: 5,
        flexDirection: 'row'
        
    },

    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor:'#fff',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal:20,
        fontSize: 16,
        shadowColor: 'rgba(56, 56, 134, 0.589)',
        shadowOpacity: 0.9,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation:2,
    },

        loadButton: {
            width:50,
            height:50,
            backgroundColor: 'rgba(56, 56, 134, 0.589)',
            borderRadius:25,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft:15, 
            
        },

})
 


export default Main;

