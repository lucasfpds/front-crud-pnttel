import "./style.css";
import { useEffect, useState } from "react";
import check_cadastro from "../../assets/check_cadastro.png";
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

import { getCountrys, getCep } from "../../utils/getAdressFunctions";
import states from "../../utils/states";
import useGlobal from "../../hooks/useGlobal";

export default function EditUser() {
  const requests = useRequests();
  const { user, setUser, showModalMobile, showModalDelete } = useGlobal();
  const { adress } = user;
  const [countrys, setCountrys] = useState([]);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [pais, setPais] = useState(adress.pais);
  const [estado, setEstado] = useState(adress.estado);
  const [municipio, setMunicipio] = useState(adress.municipio);
  const [cep, setCep] = useState(adress.cep);
  const [rua, setRua] = useState(adress.rua);
  const [numero, setNumero] = useState(adress.numero);
  const [bairro, setBairro] = useState(adress.bairro);
  const [complemento, setComplemento] = useState(adress.complemento);
  const [cpf, setCpf] = useState(user.cpf);
  const [pis, setPis] = useState(user.pis);
  const [hasError, setHasError] = useState([]);
  const [passwordError, setPasswordError] = useState(false);

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
      toast.messageError(
        "CEP não encontrado! Preencha todos os campos manualmente."
      );
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
    if (values.password) {
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
    const newUser = await requests.put(body, "profile");

    if (!newUser) {
      return toast.messageError("Erro ao atualizar perfil");
    }
    toast.messageSuccess("Usuário atualizado com sucesso!");
    const user = await requests.get();
    setUser(user);
    setCard(true);
  }
  return (
    <>
      <div className="register-container">
        {card ? (
          <div className="div-card">
            <img src={check_cadastro} alt="Imagem check cadastro" />
            <p>Usuário atualizado com sucesso!</p>
            <Link
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="btn"
              to="/"
            >
              Ir para Home
            </Link>
          </div>
        ) : (
          <>
            {!showModalDelete && !showModalMobile ? (
              <>
                <div className="register-form-input">
                  <h2>ATENÇÃO, preecha todos os campos</h2>
                  <TextField
                    label="Nome*"
                    variant="outlined"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <TextField
                    label="Email*"
                    variant="outlined"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <TextField
                    label="CPF*"
                    variant="outlined"
                    value={cpf}
                    onChange={(event) => setCpf(Number(event.target.value))}
                  />
                  <TextField
                    label="PIS*"
                    variant="outlined"
                    value={pis}
                    onChange={(event) => setPis(Number(event.target.value))}
                  />

                  <h2>Preencha Seu Endereço</h2>
                  <div className="form-adress">
                    <div>
                      <TextField
                        className="cep"
                        label="CEP*"
                        variant="outlined"
                        value={cep}
                        onChange={(event) => setCep(Number(event.target.value))}
                      />
                      {String(cep).length !== 8 ? (
                        <p
                          style={{
                            color: "red",
                            padding: "0 .5rem",
                            fontSize: "1rem",
                          }}
                        >
                          Digite um CEP Válido
                        </p>
                      ) : null}
                    </div>
                    <TextField
                      label="Rua*"
                      variant="outlined"
                      value={rua}
                      onChange={(event) => setRua(event.target.value)}
                    />
                    <TextField
                      className="number"
                      label="Número*"
                      variant="outlined"
                      value={numero}
                      onChange={(event) => setNumero(event.target.value)}
                    />
                    <TextField
                      label="Bairro*"
                      variant="outlined"
                      value={bairro}
                      onChange={(event) => setBairro(event.target.value)}
                    />
                    <TextField
                      label="Complemento"
                      variant="outlined"
                      value={complemento}
                      style={{ marginTop: "1rem" }}
                      onChange={(event) => setComplemento(event.target.value)}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Município*"
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
                    <FormControl sx={{ marginTop: 1, minWidth: 120 }}>
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
                  <h2>
                    Atenção, preencha uma senha somente se deseja alterar a
                    antiga
                  </h2>
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
                  Atualizar
                </button>
              </>
            ) : null}
          </>
        )}
      </div>
    </>
  );
}
