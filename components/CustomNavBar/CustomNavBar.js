import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useFonts, Inter_500Medium } from "@expo-google-fonts/inter";


function CustomNavBar(props) {

    return (
        <View style={styles.navBar}>
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
        height: '10%',
    },
});

