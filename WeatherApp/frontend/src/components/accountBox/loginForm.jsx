import React, { useContext } from "react";
import { useState } from "react"
import { useLogin } from "../../hooks/useLogin"
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
  }
  return (
    <form className="login" onSubmit={handleSubmit}>
    <BoxContainer>
      <FormContainer>
        <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} 
        value={email} />
        <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} 
        value={password}  />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit">Signin</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an accoun?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>
    </form>
  );
}
