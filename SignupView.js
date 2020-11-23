import React from 'react';
import { StyleSheet, Text, View, Button, TextInput , TouchableOpacity} from 'react-native';

class SignupView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }

    this.handleCreateAccount = this.handleCreateAccount.bind(this);
    this.backToLogin = this.backToLogin.bind(this);
  }

  /**
   * Make a POST request to create a new user with the entered information.
   * 
   * This POST request requires us to specify a requested username and password,
   * Additionally, we are sending a JSON body, so we need to specify
   * Content-Type: application/json
   * 
   * Note that we very cheaply check if the responded message is what we expect,
   * otherwise we display what we get back from the server. A more sophisticated
   * implementation would check the status code and give custom error messages
   * based on the response.
   */
  handleCreateAccount() {
    fetch('https://mysqlcs639.cs.wisc.edu/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.message === "User created!") {
          alert(JSON.stringify(res.message));
          this.props.navigation.navigate("SignIn");
        } else {
          alert(JSON.stringify(res.message));
        }
      });
  }

  /**
   * Use React Navigation to switch to the Log In page.
   */
  backToLogin() {
    this.props.navigation.navigate("SignIn");
  }

  /**
   * Displays and collects the sign up information.
   * 
   * The styling could definitely be cleaned up; should be consistent!
   */
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.bigText}accessible={true}
          accessibilityLabel='Fitness Tracker Signup View'>FitnessTracker</Text>
        <Text
        accessible={true}
        // style={{justifyContent:'center'}}
        accessibilityLabel='Please create an account below.'>
          New here? Let's get started! Please create an account below.</Text>
        <View style={styles.space} />
        <TextInput style={styles.input}
          accessible={true}
          underlineColorAndroid="transparent"
          // placeholder="Username"
          // placeholderTextColor="#992a20"
          onChangeText={(username) => this.setState({ username: username })}
          value={this.state.username}
          accessibilityLabel={'Username.'}
          accessibilityHint={'Enter your Username please, at least 5 characters'}
          autoCapitalize="none" />
        <TextInput style={styles.input}
          accessible={true}
          secureTextEntry={true}
          underlineColorAndroid="transparent"
          // placeholder="Password"
          onChangeText={(password) => this.setState({ password: password })}
          value={this.state.password}
          accessibilityLabel={'Password'}
          accessibilityHint={'Enter your Password please, at least 5 characters'}
          // placeholderTextColor="#992a20"
          autoCapitalize="none" />
        <View style={styles.space} />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>

          {/* <Button color="#942a21" style={styles.buttonInline} title="Create Account" onPress={this.handleCreateAccount} /> */}

          <TouchableOpacity
          accessible = {true}
          accessibilityLabel = {'Create Account button'}
          accessibilityHint = {'Signup a new user and Navigates to Login view'}
          style={styles.buttonInline}
          onPress={this.handleCreateAccount}
          >
            <Text style={{color:'#ffffff'}}>Create Account</Text>
          </TouchableOpacity>

          <View style={styles.spaceHorizontal} />
          {/* <Button color="#a1635f" style={styles.buttonInline} title="Nevermind!" onPress={this.backToLogin} /> */}
          <TouchableOpacity
          accessible = {true}
          accessibilityLabel = {'Never Mind button'}
          accessibilityHint = {'Navigates to Login view'}
          style={styles.buttonInline}
          onPress={this.backToLogin}
          >
            <Text style={{color:'#ffffff'}}>Never Mind</Text>
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

export default SignupView;
