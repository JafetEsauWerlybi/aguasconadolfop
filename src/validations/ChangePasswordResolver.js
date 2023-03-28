import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
const schema = yup.object().shape({
    password: yup.string("Ingresa cualquier cosa, tu contraseña es tuya")
    .required("Este campo es requerido, no se debe dejar vacio papu")
    .min(8, "Minimo 8 caracteres papu"),
})

export default yupResolver(schema)