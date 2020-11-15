import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, Alert, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from 'react-native';
import ExercisesCardView from './ExerciseCardView';
import DateTimePicker from '@react-native-community/datetimepicker';

class ExercisesView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activities: {},
            modalVisible: false,
            new_calories: 0.0,
            new_duration: 0.0,
            new_name:"",
            new_date: new Date(),
            show: false,
        }

    }

    componentDidMount() {
        this._navListener = this.props.navigation.addListener('focus', () => {
            this.fetchInfo();
        });
    }

    fetchInfo(){
        fetch('https://mysqlcs639.cs.wisc.edu/activities' , {
            method: 'GET',
            headers: { 'x-access-token': this.props.accessToken }})
        .then(res => res.json())
        .then(data => {
            this.setState({activities: data.activities})
        }) 
    }

    getExercises(){
        let exercises_list = [];
        for(let exercise of Object.values(this.state.activities)) {
            exercises_list.push(
                <ExercisesCardView key={exercise.id} data={exercise} accessToken={this.props.accessToken} fetchInfo={this.fetchInfo.bind(this)}/>
            )
        }
        return exercises_list
    }

    addActivity(){
        this.setState({modalVisible:true})
    }
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
      }
    onChange = (event, selectedDate) => {
        const currentDate = selectedDate ;
        this.setState({new_date: new Date(currentDate),
            })
      };
    async savenewActivity(){
        let date_obj = new Date(this.state.new_date)
        let date_hours = date_obj.getHours() - 6
        if(this.state.modalVisible == true)
        {
        date_obj.setHours(date_hours)
        }
        let url = 'https://mysqlcs639.cs.wisc.edu/activities' 
      
        let response = await( await fetch(url , { method: 'POST',
        headers: { 'Content-Type': 'application/json','x-access-token': this.props.accessToken},
        body: JSON.stringify({
            name: this.state.new_name,
            duration: parseFloat(this.state.new_duration),
            calories: parseFloat(this.state.new_calories),
            date: new Date(date_obj.toLocaleString())
          })
        })).json()
        this.setState({show:false})
        Alert.alert(response.message)
        this.fetchInfo()
        this.setModalVisible(false)
    }

    render() {
        const { modalVisible } = this.state;
        return (
            <ScrollView style={styles.mainContainer} contentContainerStyle={{ flexGrow: 11, justifyContent: 'center', alignItems: "center" }}>
              <Modal
                animationType="slide"
                visible={modalVisible}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <View>
                      <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>Name</Text>
                    </View>
                    <TextInput style={styles.input}
                      placeholder= "Bucky running"
                      placeholderTextColor="#d9bebd"
                      onChangeText={name => this.setState({ new_name: name})}
                      />
                    <View>
                      <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>Calories Burned</Text>
                    </View>
                    <TextInput style={styles.input}
                      placeholder="0.0"
                      placeholderTextColor="#d9bebd"
                      onChangeText={calories => this.setState({ new_calories: calories})}
                      />
                    <View>
                      <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>Duration</Text>
                    </View>
                    <TextInput style={styles.input}
                      placeholder="0.0"
                      placeholderTextColor="#d9bebd"
                      onChangeText={duration => this.setState({ new_duration: duration})}
                      />
                  </View>
                  <View>
                    <View>
                      <Button onPress={()=>this.setState({show: true})} title="Show date and Time picker!" />
                      <Text style={{textAlign:"center"}}>{this.state.new_date.toString()}</Text>
                    </View>
                      {this.state.show && (
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={this.state.new_date}
                          mode="datetime"
                          is24Hour={true}
                          display="default"
                          onChange={this.onChange}
                          />
                      )}
                  </View>
                  <Button title="Add activity" color="#900" onPress= {() =>  this.savenewActivity()}/>
                  <Button title="Close" color="#900" onPress= {() =>  this.setState({modalVisible:false})}/> 
                </View>
              </Modal>
                <View style={styles.space} />
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  <Icon name="running" size={40} color="#900" style={{ marginRight: 20 }} />
                  <Text style={styles.bigText}>Exercises</Text>
                </View>
                <View style={styles.spaceSmall}></View>
                <Text>Let's get to work!</Text>
                <Text>Record your Exercises below.</Text>
                <View style={styles.spaceSmall}/>
                <Button title="Add activity" color="#900"  onPress= {() => this.addActivity()}/>
                <View>
                  {this.getExercises()}
                </View>
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
      },centeredView: {
        flex: 1,
        justifyContent: "center",
        marginTop: 22
      },
      modalView: {
        margin: 0,
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        shadowOffset: {
          width: 0,
          height: 2
        },
        elevation: 5
      },input: {
        width: 200,
        padding: 10,
        margin: 5,
        height: 40,
        borderColor: '#c9392c',
        borderWidth: 1
      },
    
});
export default ExercisesView;