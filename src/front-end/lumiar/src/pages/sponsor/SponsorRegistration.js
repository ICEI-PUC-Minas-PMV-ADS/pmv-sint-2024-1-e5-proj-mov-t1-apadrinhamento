import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';

import api from '../../services/api';

export default function SponsorRegistration() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [cpf, setCpf] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [visible, setVisible] = useState(false);

    const onDismissSnackBar = () => setVisible(false);

    const newSponsor = () => {
        api.post("sponsor", {
            name: name,
            email: email,
            age: 25,
            cpf: cpf,
            password: password,
            donations: {}
        })
            .then((response) => {
                if (response.data) {
                   setVisible = true;
                    navigation.navigate('Login')
                }
            });
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <Image
                    source={require('../../../assets/Lumiar_branco.png')}
                    style={styles.imageLogo}
                />
                <View style={styles.formContainer}>
                    <Text style={styles.signUpTxt}>Cadastre-se</Text>

                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Nome"
                            value={name}
                            onChangeText={text => setName(text)}
                            keyboardType='default'
                        />
                    </View>

                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="E-mail"
                            value={email}
                            onChangeText={text => setEmail(text)}
                            keyboardType='email-address'
                        />
                    </View>

                    <View style={styles.inputView}>
                        <TextInputMask
                            style={styles.inputText}
                            placeholder="CPF"
                            keyboardType='numeric'
                            type={'cpf'}
                            value={cpf}
                            onChangeText={text => setCpf(text)}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Idade"
                            value={age}
                            onChangeText={text => setAge(text)}
                            keyboardType='numeric'
                        />
                    </View>

                    <View style={styles.inputView}>

                        <TextInput
                            style={styles.inputText}
                            placeholder="Senha"
                            value={password}
                            onChangeText={text => setPassword(text)}
                            keyboardType='default'
                            secureTextEntry={!passwordVisible}
                        />
                        <FontAwesome
                            name={passwordVisible ? 'eye-slash' : 'eye'}
                            size={20}
                            style={styles.passwordIcon}
                            onPress={() => setPasswordVisible(!passwordVisible)}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Confirme sua senha"
                            value={confirmPassword}
                            onChangeText={text => setConfirmPassword(text)}
                            keyboardType='default'
                            secureTextEntry={!confirmPasswordVisible}
                        />
                        <FontAwesome
                            name={confirmPasswordVisible ? 'eye-slash' : 'eye'}
                            size={20}
                            style={styles.passwordIcon}
                            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                        />
                    </View>

                    <TouchableOpacity style={styles.btnRegister} onPress={() => newSponsor()} >
                        <Text style={styles.registerTextBtn}>Cadastrar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text
                            style={styles.haveAccount}
                            onPress={() => navigation.navigate('Login')}>
                            Já possui conta? Faça login.
                        </Text>
                    </TouchableOpacity>
                </View>

                <Snackbar
                    visible={visible}
                    onDismiss={onDismissSnackBar}>
                    Conta criada com sucesso!
                </Snackbar>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E6C7E6',
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 50
    },
    imageLogo: {
        width: 250,
        height: 250,
        resizeMode: 'contain'
    },
    formContainer: {
        width: 350,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 60,
        paddingBottom: 20
    },
    signUpTxt: {
        fontWeight: 'regular',
        fontSize: 40,
        color: '#383839',
        marginBottom: 40,
        marginTop: 20,
    },
    inputView: {
        width: '85%',
        backgroundColor: '#E7E7E7',
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: 'center',
        padding: 20,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputText: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
        color: '#000000'

    },
    btnRegister: {
        width: '85%',
        backgroundColor: '#C693C6',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    registerTextBtn: {
        color: '#ffffff'
    },
    haveAccount: {
        color: '#007bff',
        fontSize: 14,
        marginBottom: 10
    },
    passwordIcon: {
        paddingBottom: 20,
        color: '#383839'
    }
});