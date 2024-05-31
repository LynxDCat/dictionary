import { Image, View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { Controller } from 'react-hook-form';


export default function CustomSearch({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 3,
  
}, props) {

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <View
            style={[
              styles.container,
              { borderColor: error ? 'red' : '#e8e8e8' },
              props.style
            ]}
          >
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={styles.input}
              secureTextEntry={secureTextEntry}
              autoCorrect={false}
              autoCapitalize='none'
              autoComplete='off'
              keyboardType={keyboardType}
              multiline={multiline}
              numberOfLines={multiline && numberOfLines ? numberOfLines : 3}
            />
            
              <Pressable
                style={({ pressed }) => [
                  pressed ? styles.pressed : '',
                  styles.buttonInnerContainer,
                  props.buttonStyle,
                ]}
                onPress={props.onPress}
                disabled={props.disabled}
              >
                <Image source={require('@/assets/images/searchIcon.png')} style={[styles.image]}>{props.children}</Image>
                <Text style={[props.textStyle]}>{props.children}hello</Text>
              </Pressable>
           
            
          </View>
          {error && (
            <Text style={[styles.textDanger, { alignSelf: 'stretch' }]}>
              {error.message || 'This field is required.'}
            </Text>
          )}
        </>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#CDCDC3',
    width: '80%',
    height: '7%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 50,
    paddingLeft: '2%',
    paddingRight: '2%',
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',

  },
  paragraph: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  textDanger: {
    color: '#DC143C',
  },
  input: {
    fontFamily: "Inter-Light",
    width: '100%',
    paddingLeft: 8,
    backgroundColor: '#CDCDC3',
    fontWeight: 300,
    color: "#1D3754",
  },
  imageView: {
    width: '3%',
    height: '80%',
    backgroundColor: "blue"
  },
  image: {
    width: '100%',
    height: '100%',
  },
  pressed: {
    opacity: 0.75,
  },
});

