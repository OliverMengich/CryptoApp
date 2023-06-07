import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
function Button({children,onPress, widthSet}) {
    return (
        <View style={[styles.buttonOuterContainer,{width: widthSet,}]}>
            <Pressable
                style={({ pressed }) =>
                    pressed
                        ? [styles.pressed, styles.button_Inner_container]
                        : styles.button_Inner_container
                }
                android_ripple={{ color: '#6CA9F9' }}
                onPress={onPress}
            >
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    );
}
const styles = StyleSheet.create({
    button_Inner_container: {
        backgroundColor: '#4E97F5',
        
        paddingVertical: 16,
        paddingHorizontal: 16,
        elevation: 4,
    },
    buttonOuterContainer: {
        
        margin: 4,
        borderRadius: 1,
        overflow: "hidden",
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
    },
    pressed: {
        opacity: 0.75,
    },
});
export default Button;