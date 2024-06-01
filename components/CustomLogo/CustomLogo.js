import { StyleSheet, View, Image, Pressable } from 'react-native';



function CustomLogo(props) {


  return(
    <View style = {[styles.container, props.style]}>
      <Image source={require('@/assets/images/logoBlue.jpg')} style = {styles.logoImage}/>
      <Image source={require('@/assets/images/talahuluganan.jpg')} style = {styles.logoWord}/>

    </View>
  );
}

export default CustomLogo;

const styles = StyleSheet.create({
   container:{
    alignItems: "center",
    justifyContent: 'center',
   },
   logoImage:{
    width: 150,
    height: 150
   },
   logoWord:{
    width: 200,
    height: 50,
   },
  
});

