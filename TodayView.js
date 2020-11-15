import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from 'react-native';
import { Card} from 'react-native-elements'
import ExercisesTodayView from './ExerciseTodayView';


class TodayView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activities: {},
            dailyActivity: 0.0,
            dailyActivityGoal:0.0,
        }
    }
   componentDidMount() {
        this._navListener = this.props.navigation.addListener('focus', () => {
            this.fetchInfo();
        });
    }

    fetchInfo(){
       fetch('https://mysqlcs639.cs.wisc.edu/users/' + this.props.username, {
        method: 'GET',
        headers: { 'x-access-token': this.props.accessToken }
        })
        .then(res => res.json())
        .then(data => {
        this.setState({
            dailyActivityGoal: data.goalDailyActivity
        });
      })
        fetch('https://mysqlcs639.cs.wisc.edu/activities' , {
            method: 'GET',
            headers: { 'x-access-token': this.props.accessToken }})
        .then(res => res.json())
        .then(data => {
            this.setState({activities: data.activities})
        }) 
    }
    getExercises(){
        let todayDate = new Date(new Date().toDateString())
        let exercises_list = [];
        for(let exercise of Object.values(this.state.activities)) {
            let exerciseDate = new Date(exercise.date)
            exerciseDate.setHours(0, 0, 0, 0)
            if(exerciseDate.getTime() == todayDate.getTime()){
                exercises_list.push(
                    <ExercisesTodayView key={exercise.id} data={exercise} accessToken={this.props.accessToken} fetchInfo={this.fetchInfo.bind(this)}/>
                )
            }
        }
        return exercises_list
    }
    getDailyActivities(){
        let todayDate = new Date(new Date().toDateString())
        let daily_activity = 0.0;
        for(let exercise of Object.values(this.state.activities)){
            let exerciseDate = new Date(exercise.date)
            exerciseDate.setHours(0, 0, 0, 0)
            if(exerciseDate.getTime() == todayDate.getTime()){
                daily_activity = daily_activity + exercise.duration
            }
        }
        return daily_activity.toString()
    }
    render() {
        return (
            <ScrollView style={styles.mainContainer} contentContainerStyle={{ flexGrow: 11, justifyContent: 'center', alignItems: "center" }}>
                    <View style={styles.space} />
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Icon name="cog" size={40} color="#900" style={{ marginRight: 20 }} />
                        <Text style={styles.bigText}>Today</Text>
                    </View>
                    <View style={styles.spaceSmall}></View>
                    <Text>What's on the agenda for today?</Text>
                    <Text>Below are all of your goals and exercises.</Text>
                    <View>
                        <Card>
                            <Card.Title>Goal Status</Card.Title>
                                <View>
                                    <Text>Daily Activitiies:  {this.getDailyActivities()}/{this.state.dailyActivityGoal}</Text>
                                </View>
                        </Card>
                    </View>
                    <View style={styles.space}></View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Icon name="running" size={20} color="#900" style={{ marginRight: 20 }} />
                        <Text style={styles.smallText}>Exercises</Text>
                    </View>
                    <View>
                        {this.getExercises()}
                    </View>
                    <View style={styles.space} />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    scrollView: {
        height: Dimensions.get('window').height
      },
      mainContainer: {
        flex: 1
      },
      scrollViewContainer: {},
      container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      bigText: {
        fontSize: 32,
        fontWeight: "700",
        marginBottom: 5
      },
      spaceSmall: {
        width: 20,
        height: 10,
      },
      space: {
        width: 20,
        height: 20,
      },smallText: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 5
      },spaceHorizontal: {
        display: "flex",
        width: 20
      },
    
});

export default TodayView;