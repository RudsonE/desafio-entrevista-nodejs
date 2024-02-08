import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import {
  NativeBaseProvider,
  Box,
  FormControl,
  Stack,
  Input,
  Button,
  Center,
} from "native-base";

import axios from "axios";


const baseUrl = "http://192.160.166.56:3000/"

async function logIn() {
  try {
    const response = await axios.post(`${baseUrl}/user/login`, {
      email: "rudson@mail.com",
      password: "senha123"
    }, {headers: {"Content-Type": "application/json"}});
    // const response = await axios.get(`${baseUrl}/docs`)
   
    return response.data
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return error.forEach(element => {
          element
    });; // Retorna null em caso de erro
  }
}

export default function LoginScreen(props) {
  
  const [dados, setDados] = useState();
  const navigation = useNavigation();

  return (
    <NativeBaseProvider>
      <Box flex={1} bg="#fff" alignItems="center" justifyContent="center">
        <Stack mx="4" alignContent="center" alignItems="center">
          <Image
            alt="Logo do app"
            source={require("../resources/martelo-de-leilao.png")}
            style={{ alignContent: "center" }}
          />
          <Text style={{ fontSize: 30 }}>Leilão de Carros</Text>
          <Text style={{ fontSize: 15 }}> {dados}</Text>
        </Stack>
        <FormControl isRequired>
          <Stack mx="4">
            <FormControl.Label>Email</FormControl.Label>
            <Input type="email" placeholder="mail@example.com" />
          </Stack>
        </FormControl>
        <FormControl isRequired>
          <Stack mx="4">
            <FormControl.Label>Senha</FormControl.Label>
            <Input type="password" placeholder="12345" />
          </Stack>
        </FormControl>
        <FormControl>
          <Stack mx="4" my="20">
            <Button onPress={async ()=> setDados(await logIn())}>Entrar</Button>
          </Stack>
        </FormControl>
        <Stack>
          <Text>Copyright Rudson Emanoel - {new Date().getFullYear()}</Text>
        </Stack>
      </Box>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
