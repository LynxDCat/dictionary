import { StyleSheet, View, Text, Pressable } from 'react-native';

function CustomButton(props) {
  return (
    <View style={[styles.buttonOuterContainer, props.style]}>
      <Pressable
        style={({ pressed }) => [
          pressed ? styles.pressed : '',
          styles.buttonInnerContainer,
          props.buttonStyle,
        ]}
        onPress={props.onPress}
        disabled={props.disabled}
      >
        <Text style={[styles.button, props.textStyle]}>{props.children}</Text>
      </Pressable>
    </View>
  );
}

export default CustomButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 10,
    margin: 4,
    overflow: 'hidden',
    width: "100%",
  },
  buttonInnerContainer: {
    paddingVertical: 6,
    paddingVertical: 12,
    elevation: 2,
    width: "100%"
  },
  button: {
    fontFamily: "Inter-Medium",
    fontWeight: 500,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
});

