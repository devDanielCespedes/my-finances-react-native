import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

interface IconProps {
  type: "up" | "down";
}

interface ContainerProps {
  isActivite: boolean;
  type: "up" | "down";
}

export const Container = styled(TouchableOpacity) <ContainerProps>`
  width: 48%;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  border-width:  ${({ isActivite }) => isActivite ? 0 : 1.5}px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text};

  border-radius: 5px;

  padding: 16px;

  ${({ isActivite, type }) =>
    isActivite &&
    type === "up" &&
    css`
      background-color: ${({ theme }) => theme.colors.success_light};
    `}

  ${({ isActivite, type }) =>
    isActivite &&
    type === "down" &&
    css`
      background-color: ${({ theme }) => theme.colors.attention_light};
    `}
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  color: ${({ theme, type }) =>
    type === "up" ? theme.colors.success : theme.colors.attention};
  margin-right: 12px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;
