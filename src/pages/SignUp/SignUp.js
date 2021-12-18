// import Rectangle_register from "../../assets/Rectangle_register.png";
import "./style.css";
import { useEffect, useState } from "react";
import check_cadastro from "../../assets/check_cadastro.png";
import Rectangle_register_done from "../../assets/Rectangle_register_done.png";
import Rectangle_register_next from "../../assets/Rectangle_register_next.png";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import { Link } from "react-router-dom";
import toast from "../../helpers/toast";
import useRequests from "../../hooks/useRequests";

import TextField from "@mui/material/TextField";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { getCountrys, getCep, states } from "../../utils/functions";

export default function SignUp() {
  const requests = useRequests();
  const [countrys, setCountrys] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pais, setPais] = useState("");
  const [estado, setEstado] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [complemento, setComplemento] = useState();
  const [cpf, setCpf] = useState("");
  const [pis, setPis] = useState("");
  const [hasError, setHasError] = useState([]);
  const [passwordError, setPasswordError] = useState(false);

  // const [showPassword, setShowPassword] = useState(false);
  const [card, setCard] = useState(false);

  async function fetchCountrys() {
    const response = await getCountrys();
    setCountrys(response);
  }

  useEffect(() => {
    fetchCountrys();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const [valuesConfirm, setValuesConfirm] = useState({
    password: "",
    showPassword: false,
  });

  const handleChangeConfirm = (prop) => (event) => {
    setValuesConfirm({ ...valuesConfirm, [prop]: event.target.value });
  };

  const handleClickShowPasswordConfirm = () => {
    setValuesConfirm({
      ...valuesConfirm,
      showPassword: !valuesConfirm.showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  async function getAdress(cep) {
    const data = await getCep(cep).then((response) => {
      return response;
    });
    if (!data.erro) {
      const findState = states.find((item) => item.abbreviation === data.uf);
      setEstado(findState.state);
      setMunicipio(data.localidade);
      setBairro(data.bairro);
      setRua(data.logradouro);
    } else {
      toast.messageError("CEP não encontrado! Preencha todos os campos.");
    }
  }

  useEffect(() => {
    let errors = [...hasError];
    if (String(cep).length !== 8) {
      setEstado("");
      setMunicipio("");
      setRua("");
      !errors.includes("cep") && errors.push("cep");
    } else {
      getAdress(String(cep));
      errors = errors.filter((item) => item !== "cep");
    }
    setHasError(errors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cep]);

  useEffect(() => {
    let errors = [...hasError];
    if (
      values.password.length < 6 ||
      valuesConfirm.password !== values.password
    ) {
      setPasswordError(true);
      !errors.includes("password") && errors.push("password");
    } else {
      setPasswordError(false);
      errors = errors.filter((item) => item !== "password");
    }

    if (
      String(cpf).length !== 11 ||
      String(pis).length !== 11 ||
      !email.includes("@")
    ) {
      !errors.includes("cpf") && errors.push("cpf");
      !errors.includes("pis") && errors.push("pis");
      !errors.includes("email") && errors.push("email");
    } else {
      errors = errors.filter((item) => item !== "cpf");
      errors = errors.filter((item) => item !== "pis");
      errors = errors.filter((item) => item !== "email");
    }
    setHasError(errors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.password, valuesConfirm.password, cpf, pis, email]);

  const handleChangeCountry = (event) => {
    setPais(event.target.value);
  };

  async function handleSubmit() {
    if (
      !values.password ||
      !valuesConfirm.password ||
      !name ||
      !email ||
      !cpf ||
      !pis ||
      !pais ||
      !estado ||
      !municipio ||
      !cep ||
      !rua ||
      !numero ||
      !bairro
    ) {
      return toast.messageError("Preencha todos os campos corretamente.");
    }

    console.log(
      values.password,
      valuesConfirm.password,
      name,
      email,
      cpf,
      pis,
      pais,
      estado,
      municipio,
      cep,
      rua,
      numero,
      bairro
    );
    if (hasError[0])
      return toast.messageError(
        "Verifique se todos os campos estão preenchidos corretamente"
      );
    const body = {
      name,
      email,
      cpf,
      pis,
      password: values.password,
      adress: {
        cep,
        rua,
        numero,
        complemento,
        bairro,
        municipio,
        estado,
        pais,
      },
    };
    const newUser = await requests.post(body, "users");
    console.log(newUser);

    if (newUser) {
      toast.messageSuccess("Cadastro realizado com sucesso!");
      setCard(true);
    }
  }
  console.log("hasError: ", hasError);
  return (
    <>
      <div className="register-container">
        {card ? (
          <div className="div-card">
            <img src={check_cadastro} alt="Imagem check cadastro" />
            <p>Cadastro realizado com sucesso!</p>
            <Link
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="btn"
              to="/sign-in"
            >
              Ir para Login
            </Link>
          </div>
        ) : (
          <>
            <div className="register-form-input">
              <h2>ATENÇÃO, preecha todos os campos</h2>
              <TextField
                label="Nome*"
                variant="outlined"
                onChange={(event) => setName(event.target.value)}
              />
              <TextField
                label="Email*"
                variant="outlined"
                onChange={(event) => setEmail(event.target.value)}
              />
              <TextField
                label="CPF*"
                variant="outlined"
                onChange={(event) => setCpf(Number(event.target.value))}
              />
              <TextField
                label="PIS*"
                variant="outlined"
                onChange={(event) => setPis(Number(event.target.value))}
              />

              <h2>Preencha Seu Endereço</h2>
              <div className="form-adress">
                <div>
                  <TextField
                    className="cep"
                    label="CEP*"
                    variant="outlined"
                    onChange={(event) => setCep(Number(event.target.value))}
                  />
                  {String(cep).length !== 8 ? (
                    <p
                      style={{
                        color: "red",
                        padding: "0 .5rem",
                        fontSize: "1rem",
                        marginBottom: "1rem",
                      }}
                    >
                      Digite um CEP Válido
                    </p>
                  ) : null}
                </div>
                <TextField
                  label="Rua*"
                  variant="outlined"
                  onChange={(event) => setRua(event.target.value)}
                  value={rua}
                />
                <TextField
                  className="number"
                  label="Número*"
                  variant="outlined"
                  onChange={(event) => setNumero(event.target.value)}
                />
                <TextField
                  label="Bairro*"
                  variant="outlined"
                  onChange={(event) => setBairro(event.target.value)}
                  value={bairro}
                />
                <TextField
                  label="Complemento"
                  variant="outlined"
                  style={{ marginTop: "1rem" }}
                  onChange={(event) => setComplemento(event.target.value)}
                />
                <TextField
                  id="outlined-basic"
                  label="Município*"
                  Styl
                  variant="outlined"
                  style={{ marginTop: "1rem" }}
                  onChange={(event) => setMunicipio(event.target.value)}
                  value={municipio}
                />
                <TextField
                  label="Estado*"
                  variant="outlined"
                  style={{ marginTop: "1rem" }}
                  onChange={(event) => setEstado(event.target.value)}
                  value={estado}
                />
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    value={pais}
                    onChange={handleChangeCountry}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value="">
                      <em>Selecione Um País*</em>
                    </MenuItem>
                    {countrys
                      ? countrys.map((item, index) => (
                          <MenuItem key={index} value={item}>
                            {item}
                          </MenuItem>
                        ))
                      : null}
                  </Select>
                </FormControl>
              </div>

              <FormControl
                className="input-password"
                sx={{ m: 1, width: "25ch" }}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Senha*
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>

              <div className="div-password">
                <FormControl
                  className="input-password"
                  sx={{ m: 1, width: "25ch" }}
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Repita a Senha*
                  </InputLabel>
                  <OutlinedInput
                    id="filled-adornment-password"
                    type={valuesConfirm.showPassword ? "text" : "password"}
                    value={valuesConfirm.password}
                    onChange={handleChangeConfirm("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPasswordConfirm}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                {passwordError ? (
                  <p
                    style={{
                      color: "red",
                      padding: "0 .5rem",
                      fontSize: "1rem",
                      margin: "0 0 .5rem",
                    }}
                  >
                    As senhas devem ser iguais e devem ter no mínimo 6
                    caracteres
                  </p>
                ) : null}
              </div>
            </div>

            <button className="btn" onClick={handleSubmit}>
              Cadastrar
            </button>
            <p>
              Já possui uma conta? <Link to="/sign-in">Faça o Login</Link>
            </p>
          </>
        )}
      </div>
    </>
  );
}
