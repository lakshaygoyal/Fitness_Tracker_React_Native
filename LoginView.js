import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import base64 from 'base-64';

class LoginView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  /**
   * Logs in to the application.
   * 
   * Note that we have to follow the authorization rules; a header
   * with a base64-encoded username and password.
   * 
   * Upon response, we analyze whether or not we are successful.
   * If successful, we use a callback from App to log us in and
   * store the username and token in App.
   */
  handleLogin() {
    fetch('https://mysqlcs639.cs.wisc.edu/login', {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + base64.encode(this.state.username + ":" + this.state.password)
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.token) {
          this.props.login(this.state.username, res.token);
        } else {
          alert("Incorrect username or password! Please try again.");
        }
      });
  }

  /**
   * Use React Navigation to switch to the Sign Up page.
   */
  handleSignup() {
    this.props.navigation.navigate('SignUp');
  }

  /**
   * Displays and collects the login information.
   * 
   * The styling could definitely be cleaned up; should be consistent!
   */
  render() {
    return (
      <View style={styles.container} >
        <Text style={styles.bigText} accessible={true}
          accessibilityLabel='Fitness Tracker Login View'>
          FitnessTracker</Text>
        <View>
          <Text accessible={true}
            accessibilityLabel='Welcome! Please login or signup to continue.'
          >
            Welcome! Please login or signup to continue.
          </Text>
        </View>

        <View style={styles.space} />
        <TextInput
          // underlineColorAndroid="transparent"
          // placeholder="Username"
          // placeholderTextColor="#992a20"
          // onChangeText={(username) => this.setState({ username: username })}
          // value={this.state.username}
          // autoCapitalize="none" 
          // accessible={true} 
          // accessibilityLabel="Username Field" 
          // accessibilityHint="Input Username and Password to authenticate"

          accessible={true}
          underlineColorAndroid="transparent"
          // placeholder="Enter Username"
          // placeholderTextColor="#992a20"
          onChangeText={(username) => this.setState({ username: username })}
          value={this.state.username}
          autoCapitalize="none"
          accessibilityLabel={'Username.'}
          accessibilityHint={'Enter your Username please, at least 5 characters'}
          style={styles.input} />
        <TextInput
          // secureTextEntry={true}
          // underlineColorAndroid="transparent"
          // // placeholder="Password"
          // // placeholderTextColor="#992a20"
          // onChangeText={(password) => this.setState({ password: password })}
          // value={this.state.password}
          // autoCapitalize="none" 
          // accessible={true} 
          // accessibilityLabel="Password Field" 
          // accessibilityHint="Input Username and Password to authenticate"


          accessible={true}
          secureTextEntry={true}
          underlineColorAndroid="transparent"
          // placeholder="Enter Password"
          // placeholderTextColor="#992a20"
          onChangeText={(password) => this.setState({ password: password })}
          value={this.state.password}
          autoCapitalize="none"
          // accessibilityLabel={'enter your password please'}

          accessibilityLabel={'Password'}
          accessibilityHint={'Enter your Password please, at least 5 characters'}
          style={styles.input} />


        <View style={styles.space} />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {/* <Button color="#942a21" style={styles.buttonInline} title="Login" onPress={this.handleLogin}
            accessible={true} accessibilityLabel="Login Button" accessibilityHint="Authenticates and navigates to Today's View page"
          /> */}

          <TouchableOpacity
          accessible = {true}
          accessibilityLabel = {'LogIn button'}
          accessibilityHint = {'Navigates to Todays view Tab'}
            style={styles.buttonInline}
            onPress={this.handleLogin}
          >
            <Text style={{color:'#ffffff'}}>Login</Text>
          </TouchableOpacity>
          <View style={styles.spaceHorizontal} />
          {/* <Button color="#942a21" style={styles.buttonInline} title="Signup" onPress={this.handleSignup}
          accessible={true} accessibilityLabel="SignUp Button" accessibilityHint="Navigates to SignUp Page"
          /> */}
          <TouchableOpacity
          accessible = {true}
          accessibilityLabel = {'Signup button'}
          accessibilityHint = {'Navigates to Signup view'}
            style={styles.buttonInline}
            onPress={this.handleSignup}
          >
            <Text style={{color:'#ffffff'}}>Signup</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigText: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 5
  },
  space: {
    width: 20,
    height: 20,
  },
  spaceHorizontal: {
    display: "flex",
    width: 20
  },
  buttonInline: {
    display: "flex",
    backgroundColor: "#942a21",
    alignItems: "center",
    padding: 10
  },
  input: {
    width: 200,
    padding: 10,
    margin: 5,
    height: 40,
    borderColor: '#c9392c',
    borderWidth: 1
  }
});

export default LoginView;
