import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';

export default class Spinner extends Component {

  render() {
    return (
		<View style={styles.spinnerStyle}>
		<ActivityIndicator size='large' />
		</View>
	);
};
}

const styles = {
	spinnerStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
    marginTop: 10,
	}
};
