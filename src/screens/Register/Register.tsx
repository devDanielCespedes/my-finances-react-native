import React, { useState } from "react";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import * as Yup from "yup";

import { useForm } from "react-hook-form";

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
  name: string;
  amount: string;
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

  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleTransactionTypeSelect = (type: "up" | "down") => {
    setTransactionType(type);
  };

  const handleOpenSelectCategoryModal = () => setCategoryModalOpen(true);

  const handleCloseSelectCategoryModal = () => setCategoryModalOpen(false);

  const handleRegister = (form: FormData) => {
    if (!transactionType) return Alert.alert("Selecione o tipo da transação");

    if (category.key === "category")
      return Alert.alert("Selecione a categoria");

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    };
    console.log(data);
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
              autoCapitalize="sentences"
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
                isActivite={transactionType === "up"}
                type="up"
                title="Income"
                onPress={() => handleTransactionTypeSelect("up")}
              />
              <TransactionTypeButton
                isActivite={transactionType === "down"}
                type="down"
                title="Outcome"
                onPress={() => handleTransactionTypeSelect("down")}
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
