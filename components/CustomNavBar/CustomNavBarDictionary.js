import { StyleSheet, View, Pressable, Image } from 'react-native';
import CustomInput from "@/components/CustomInput/CustomInput";
import { useForm } from 'react-hook-form';



function CustomNavBar(props) {
    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm({
        defaultValues: {
          word: '',
        },
      });
    

    return (
        <View style={[styles.navBar, props.style]}>
            <Pressable onPress={props.onPressBack}>
                <Image source={require('@/assets/images/backButton.png')} style={styles.icon} />
            </Pressable>
            <CustomInput
                control={control}
                name='word'
                rules={{ required: false }}
                placeholder='Enter a Word'
                style={styles.input}
            />
            <Pressable onPress={handleSubmit(props.onPressSearch)}>
                <Image source={require('@/assets/images/searchIcon.png')} style={styles.icon} />
            </Pressable>
        </View>
    );
}

export default CustomNavBar;

const styles = StyleSheet.create({

    navBar: {
        flexDirection: "row",
        backgroundColor: "#CAA35D",
        alignItems: 'center',
        justifyContent: 'center',
        height: '8%',
        padding: 0,
        margin: 0,
    },
    icon: {
        height: 30,
        width: 30,
      },
});

