import React from 'react';
import ProfileView from './ProfileView'
import Ionicons from 'react-native-vector-icons/Ionicons';
import TodayView from './TodayView'
import ExercisesView from './ExercisesView'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

class Apparea extends React.Component {

    render(){
        let TabNavigation = createBottomTabNavigator();
        return(
            <TabNavigation.Navigator
            initialRouteName="Today">
                <TabNavigation.Screen
                    name="Profile"
                    options={{
                        tabBarLabel: 'Me',
                        tabBarIcon: ({ focused, tintColor }) => {
                          let iconName = `ios-person`;
                          return <Ionicons name={iconName} size={25} color={tintColor} />;
                        },
                        tabBarOptions: {
                          activeTintColor: 'tomato',
                          inactiveTintColor: 'gray',
                        },
                        animationEnabled: true,
                      }}>
                        {(props) => <ProfileView {...props} username={this.props.username} accessToken={this.props.accessToken} />}
                </TabNavigation.Screen>
                <TabNavigation.Screen
                    name="Today"
                    options={{
                        tabBarLabel: 'Today',
                        tabBarIcon: ({ focused, tintColor }) => {
                          let iconName = `ios-sunny`;
                          return <Ionicons name={iconName} size={25} color={tintColor} />;
                        },
                        tabBarOptions: {
                          activeTintColor: 'tomato',
                          inactiveTintColor: 'gray',
                        },
                        animationEnabled: true,
                      }}>
                        {(props) => <TodayView {...props} username={this.props.username} accessToken={this.props.accessToken} />}
                </TabNavigation.Screen>
                <TabNavigation.Screen
                    name="Exercises"
                    options={{
                        tabBarLabel: 'Exercises',
                        tabBarIcon: ({ focused, tintColor }) => {
                          let iconName = `ios-bicycle`;
                          return <Ionicons name={iconName} size={25} color={tintColor} />;
                        },
                        tabBarOptions: {
                          activeTintColor: 'tomato',
                          inactiveTintColor: 'gray',
                        },
                        animationEnabled: true,
                      }}>
                        {(props) => <ExercisesView {...props} username={this.props.username} accessToken={this.props.accessToken} />}
                </TabNavigation.Screen>
            </TabNavigation.Navigator>

        )
    }

}
export default Apparea;