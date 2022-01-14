import React, { useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { ActivityIndicator, Alert, Platform } from "react-native";
import { useTheme } from "styled-components";

import AppleSVG from "../../assets/apple.svg";
import GoogleSVG from "../../assets/google.svg";
import LogoSVG from "../../assets/logo.svg";
import { useAuth } from "../../hooks/auth";
import { SignInSocialButton } from "../../components/SignInSocialButton/SignInSocialButton";

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from "./styles";

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const { signInWithGoogle, signInWithApple } = useAuth();
  const theme = useTheme();

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar a conta Google!");
      setIsLoading(false);
    }
  }

  async function handleSignInWithApple() {
    try {
      setIsLoading(true);
      return await signInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar a conta Apple!");
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSVG width={RFValue(120)} height={RFValue(68)} />

          <Title>
            Controle suas {"\n"}financças de forma{"\n"} muito simples
          </Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com {"\n"} uma das contas abaixo
        </SignInTitle>
      </Header>
      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            onPress={handleSignInWithGoogle}
            title="Entrar com Google"
            svg={GoogleSVG}
          />
          {Platform.OS === "ios" && (
            <SignInSocialButton
              onPress={handleSignInWithApple}
              title="Entrar com Apple"
              svg={AppleSVG}
            />
          )}
        </FooterWrapper>

        {isLoading && (
          <ActivityIndicator
            style={{ marginTop: 18 }}
            color={theme.colors.shape}
          />
        )}
      </Footer>
    </Container>
  );
}
