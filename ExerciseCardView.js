import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, Modal } from 'react-native';
import { Card} from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker';


class ExercisesCardView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exercise_calories: 0.0,
            exercise_duration:0.0,
            exercise_name:"",
            exercise_date: new Date(this.props.data.date),
            current_date: new Date(this.props.data.date),
            mode: 'date',
            show: false,
            modalVisible: false
        }
    }
    componentDidMount() {
        this.getInfo();
    }
    getInfo(){
        this.setState({
            exercise_calories: this.props.data.calories,
            exercise_duration:this.props.data.duration,
            exercise_name: this.props.data.name,
          })
    }
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
      }
    onChange = (event, selectedDate) => {
        const currentDate = selectedDate ;
        this.setState({current_date: new Date(currentDate),
            exercise_date:new Date(currentDate)
            })
      };
    async saveActivity(){
        let date_obj = new Date(this.state.current_date)
        let date_hours = date_obj.getHours() - 6
        if(this.state.modalVisible == true)
            {
            date_obj.setHours(date_hours)
            }
        let url = 'https://mysqlcs639.cs.wisc.edu/activities/' + this.props.data.id
      
        let response = await( await fetch(url , { method: 'PUT',
        headers: { 'Content-Type': 'application/json','x-access-token': this.props.accessToken},
        body: JSON.stringify({
            name: this.state.exercise_name,
            duration: parseFloat(this.state.exercise_duration),
            calories: parseFloat(this.state.exercise_calories),
            date: new Date(date_obj.toLocaleString())
          })
        })).json()
        this.setState({show:false})
        Alert.alert(response.message)
        await(this.props.fetchInfo())
        this.getInfo()
        this.setModalVisible(false)
    }

    async deleteActivity(){
        let url = 'https://mysqlcs639.cs.wisc.edu/activities/' + this.props.data.id
        let response = await( await fetch(url , { method: 'DELETE',
        headers: { 'x-access-token': this.props.accessToken
          }})).json()
          Alert.alert(response.message)
          this.props.fetchInfo()
    }
    
    render() {
        const { modalVisible } = this.state;
        return (
            <View>
                <Modal
                    animationType="slide"
                    visible={modalVisible}
                    >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View>
                                <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>Name</Text>
                            </View>
                            <TextInput style={styles.input}
                            placeholder= "Bucky"
                            placeholderTextColor="#d9bebd"
                            onChangeText={name => this.setState({ exercise_name: name})}
                            value={this.state.exercise_name}
                            />
                            <View>
                                <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>Calories Burned</Text>
                            </View>
                            <TextInput style={styles.input}
                            placeholder="0.0"
                            placeholderTextColor="#d9bebd"
                            onChangeText={calories => this.setState({ exercise_calories: calories})}
                            value={this.state.exercise_calories.toString()}
                            />
                            <View>
                                <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>Duration</Text>
                            </View>
                            <TextInput style={styles.input}
                            placeholder="0.0"
                            value={this.state.exercise_duration.toString()}
                            placeholderTextColor="#d9bebd"
                            onChangeText={duration => this.setState({ exercise_duration: duration})}
                            />
                        </View>
                        <View>
                            <View>
                                <Button onPress={()=>this.setState({show: true})} title="Show date and Time picker!" />
                                <Text style={{textAlign:"center"}}>{new Date(this.props.data.date).toString()}</Text>
                            </View>
                            {this.state.show && (
                                <DateTimePicker
                                testID="dateTimePicker"
                                value={this.state.exercise_date}
                                mode="datetime"
                                is24Hour={true}
                                display="default"
                                onChange={this.onChange}
                                />
                                )}
                        </View>
                        <Button title="Save activity" color="#900" onPress= {() =>  this.saveActivity()}/>
                        <Button title="Close" color="#900" onPress= {() =>  this.setState({modalVisible:false, show : false})}/>
                    </View>
                </Modal>
                <Card>
                    <Card.Title>{this.props.data.name}</Card.Title>
                    <View>
                        <Text>Date: {new Date(this.props.data.date).toLocaleString()}</Text>
                        <Text>Calories Burned: {this.props.data.calories}</Text>
                        <Text>Duration:  {this.props.data.duration} mins</Text>
                        <Button title="Delete activity" color="#900" onPress= {() => this.deleteActivity()}/>
                        <Button title="Edit activity" color="#900" onPress= {() =>  this.setModalVisible(true)}/>
                    </View>
                </Card>
            </View>
            )
    }
}

const styles = StyleSheet.create({
    input: {
        width: 200,
        padding: 10,
        margin: 5,
        height: 40,
        borderColor: '#c9392c',
        borderWidth: 1
      },centeredView: {
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 0,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
    
});

export default ExercisesCardView;