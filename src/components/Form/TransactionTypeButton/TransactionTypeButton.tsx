import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Container, Icon, Title } from "./styles";

const icons = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
};

interface Props extends TouchableOpacityProps {
  title: string;
  type: "up" | "down";
  isActivite: boolean;
}
export function TransactionTypeButton({
  title,
  type,
  isActivite,
  ...rest
}: Props) {
  return (
    <Container type={type} isActivite={isActivite} {...rest}>
      <Icon name={icons[type]} type={type} />
      <Title>{title}</Title>
    </Container>
  );
}
