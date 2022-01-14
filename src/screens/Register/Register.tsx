import React, { useState } from "react";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

import { useAuth } from "../../hooks/auth";
import { useForm } from "react-hook-form";
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native";

import { yupResolver } from "@hookform/resolvers/yup";

import { Button } from "../../components/Form/Button/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton/CategorySelectButton";
import { InputForm } from "../../components/Form/InputForm/InputForm";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect/CategorySelect";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from "./styles";

interface FormData {
  [name: string]: any;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  amount: Yup.number()
    .typeError("Informe um valor numérico")
    .positive("O valor não pode ser negativo")
    .required("Valor é obrigatório"),
});

export function Register() {
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const { user } = useAuth();

  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const { navigate }: NavigationProp<ParamListBase> = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const handleTransactionTypeSelect = (type: "positive" | "negative") => {
    setTransactionType(type);
  };

  const handleOpenSelectCategoryModal = () => setCategoryModalOpen(true);

  const handleCloseSelectCategoryModal = () => setCategoryModalOpen(false);

  const handleRegister = async (form: FormData) => {
    
    if (!transactionType) return Alert.alert("Selecione o tipo da transação");
    
    if (category.key === "category")
    return Alert.alert("Selecione a categoria");
    
    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    };
    
    try {
      const dataKey = `@gofinances:transactions_user:${user.id}`;
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];
      const dataFormatted = [...currentData, newTransaction];
      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      reset();
      setTransactionType("");
      setCategory({
        key: "category",
        name: "Categoria",
      });

      navigate("Listagem");
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível salvar!");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              control={control}
              name="name"
              placeholder="Nome"
              autoCapitalize="words"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              control={control}
              name="amount"
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />
            <TransactionsTypes>
              <TransactionTypeButton
                isActivite={transactionType === "positive"}
                type="up"
                title="Income"
                onPress={() => handleTransactionTypeSelect("positive")}
              />
              <TransactionTypeButton
                isActivite={transactionType === "negative"}
                type="down"
                title="Outcome"
                onPress={() => handleTransactionTypeSelect("negative")}
              />
            </TransactionsTypes>

            <CategorySelectButton
              onPress={handleOpenSelectCategoryModal}
              title={category.name}
            />
          </Fields>
          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
