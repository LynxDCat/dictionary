import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Controller } from 'react-hook-form';
import { useFonts, Inter_900Black, Inter_300Light, Inter_100Thin } from "@expo-google-fonts/inter";


export default function CustomInput({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 3,
}) {

  let [fontsLoaded] = useFonts({
    Inter_300Light,
  });

  if (!fontsLoaded) {
    return null;
  }

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
    backgroundColor: '#CDCDC3',
    width: '80%',
    height: '15%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
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
    fontFamily: "Inter_300Light",
    width: '100%',
    paddingLeft: 10,
    backgroundColor: '#CDCDC3',
    color: "#1D3754",
  },
});

