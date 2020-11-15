import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Card} from 'react-native-elements'

class ExercisesTodayView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }

    }
    getDate(date_var){
        let qwe = new Date(date_var).toLocaleString()
        return qwe
    }
    render() {
        return (
            <View>
                <Card>
                    <Card.Title>{this.props.data.name}</Card.Title>
                    <View>
                        <Text>Date: {this.getDate(this.props.data.date)}</Text>
                        <Text>Calories Burned: {this.props.data.calories}</Text>
                        <Text>Duration:  {this.props.data.duration} mins</Text>
                    </View>
                </Card>
            </View>
            )
    }
}

const styles = StyleSheet.create({
    
});

export default ExercisesTodayView;