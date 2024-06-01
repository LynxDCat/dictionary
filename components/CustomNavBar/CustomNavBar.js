import { StyleSheet, View, Text, Pressable } from 'react-native';

function CustomNavBar(props) {

    return (
        <View style={[styles.navBar, props.style]}>
            <Pressable
                onPress={props.onPress}
                disabled={props.disabled}
            >
                <Text style={[props.textStyle]}>{props.children}</Text>
            </Pressable>
        </View>
    );
}

export default CustomNavBar;

const styles = StyleSheet.create({

    navBar: {
        flexDirection: "row",
        backgroundColor: "#CAA35D",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: 20,
        height: '10%',
    },
});

