import { useEffect, useState } from "react";
import "./style.css";
import { Link, useHistory } from "react-router-dom";
import useRequests from "../../hooks/useRequests";
import useGlobal from "../../hooks/useGlobal";
import toast from "../../helpers/toast";

import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";

function SignIn() {
  const [identifier, setIdentifier] = useState("");
  const { user, setUser, token, setToken } = useGlobal();
  const history = useHistory();
  const requests = useRequests();

  useEffect(() => {
    if (token) {
      history.push("/home");
    }
    // eslint-disable-next-line
  }, []);

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  async function handleSubmit(event) {
    event.preventDefault();

    if (identifier === "" || values.password === "") {
      toast.messageError("Preencha todos os campos");
      return;
    }

    const body = { identifier, password: values.password };

    const result = await requests.post(body, "login");
    console.log(result);
    //   {
    //     "user": {
    //         "id": 2,
    //         "name": "asdf",
    //         "email": "lucas@email.com",
    //         "cpf": "12345678910",
    //         "pis": "12345678910",
    //         "adress": {
    //             "adress_id": 2,
    //             "user_id": 2,
    //             "cep": "57044116",
    //             "rua": "Rua N",
    //             "numero": "44",
    //             "complemento": "asdf",
    //             "bairro": "São Jorge",
    //             "municipio": "Maceió",
    //             "estado": "Alagoas",
    //             "pais": "Brazil"
    //         }
    //     },
    //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjM5ODQwNzQxLCJleHAiOjE2Mzk4Njk1NDF9._Ol9D7SSxOggi-mFu2Q9aC039-8GlfvMY4xANKmsTqY"
    // }
    if (result) {
      setToken(result.token);
      history.push("/home");
      setUser(result.user);
    }
  }

  return (
    <>
      <div className="login-container">
        <div className="login-form">
          <div className="login-form-title">
            <h1>Faça seu login!</h1>
          </div>

          <div className="login-form-input">
            <TextField
              id="outlined-basic"
              label="Email, CPF ou PIS"
              variant="outlined"
              onChange={(event) => setIdentifier(event.target.value)}
            />

            <FormControl
              className="input-password"
              sx={{ m: 1, width: "25ch" }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Senha
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                onKeyDown={(e) => {
                  e.key === "Enter" && handleSubmit(e);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <button className="btn" onClick={handleSubmit}>
              Entrar
            </button>
            <p>
              Ainda não possui uma conta? <Link to="/sign-up">Cadastre-se</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
