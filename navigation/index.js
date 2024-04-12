import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import ImageRedactor from '../screens/ImageRedactor';
import List from '../screens/List';
import AnimeDetails from '../screens/AnimeDetails';
import { useState } from 'react';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const headerConfig = {
    tabBarStyle: {
      backgroundColor: '#25292e',
  },
  headerStyle: {
    backgroundColor: '#25292e',
  },       
  headerTintColor: '#fff',
}

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

function MyStack() {
    const [index, setIndex] = useState(0)

    return (
      <Stack.Navigator
       screenOptions={({ route }) => ({
            ...headerConfig, 
            presentation: 'transparentModal'
        })}>
        <Stack.Screen name="List" options={{}}>
            {props => <List {...props} index={index} setIndex={setIndex}/>}
        </Stack.Screen>
        <Stack.Screen name="AnimeDetails"
            options={{
                // transitionSpec: {
                //     open: config,
                //     close: config,
                //   },
                cardStyle: {
                    backgroundColor: 'transparent'
                },
                cardStyleInterpolator: ({current}) => ({
                    cardStyle: {
                        opacity: 1,
                    }
                })
            }}  
        >
            {props => <AnimeDetails {...props} index={index} setIndex={setIndex}/>}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }

function Tabs() {
  return (
    <NavigationContainer>
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#25292e',
                },
            })}
        >
            <Tab.Screen name="ListTab" component={MyStack} />
            <Tab.Screen name="Home" component={ImageRedactor} />
        </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Tabs;