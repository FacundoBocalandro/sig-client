import {useFormik} from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormHelperText,
    Link,
    TextField,
    Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate} from "react-router-dom";
import {useAuthentication} from "../providers/AuthenticationProvider";
import toast from "react-hot-toast";
import {getFirebaseErrorMessage} from "../utils/errors";

const Register = () => {
    const navigate = useNavigate()
    const {registerUser, loading} = useAuthentication();

    const successCallback = () => {
        navigate('/')
        toast.success('¡Usuario creado!')
    }

    const errorCallback = (errorCode) => {
        toast.error(`¡Error de registro! ${getFirebaseErrorMessage(errorCode)}`)
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            companyName: '',
            policy: false
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email('El email debe ser válido')
                .max(255)
                .required('Debe ingresar un email'),
            companyName: Yup
                .string()
                .max(255)
                .required('Debe ingresar el nombre de la empresa'),
            password: Yup
                .string()
                .required('Debe ingresar una contraseña')
                .min(8, 'Contraseña muy corta - Debe tener al menos 8 carácteres.'),
            policy: Yup
                .boolean()
                .oneOf(
                    [true],
                    'Debe confirmar'
                )
        }),
        onSubmit: (values) => {
            registerUser(values, successCallback, errorCallback);
        }
    });

    return (
        <Box
            component="main"
            sx={{
                alignItems: 'center',
                display: 'flex',
                flexGrow: 1,
                minHeight: '100%'
            }}
        >
            <Container maxWidth="sm">
                <Link
                    href="/"
                    variant="subtitle2"
                    underline="hover"
                >
                    <Button
                        component="a"
                        startIcon={<ArrowBackIcon fontSize="small"/>}
                    >
                        Login
                    </Button>
                </Link>
                <form onSubmit={formik.handleSubmit}>
                    <Box sx={{my: 3}}>
                        <Typography
                            color="textPrimary"
                            variant="h4"
                        >
                            Crear una cuenta nueva
                        </Typography>
                        <Typography
                            color="textSecondary"
                            gutterBottom
                            variant="body2"
                        >
                            Use su correo electrónico para crear una cuenta nueva
                        </Typography>
                    </Box>
                    <TextField
                        error={Boolean(formik.touched.companyName && formik.errors.companyName)}
                        fullWidth
                        helperText={formik.touched.companyName && formik.errors.companyName}
                        label="Empresa"
                        margin="normal"
                        name="companyName"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.companyName}
                        variant="outlined"
                    />
                    <TextField
                        error={Boolean(formik.touched.email && formik.errors.email)}
                        fullWidth
                        helperText={formik.touched.email && formik.errors.email}
                        label="Correo electrónico"
                        margin="normal"
                        name="email"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="email"
                        value={formik.values.email}
                        variant="outlined"
                    />
                    <TextField
                        error={Boolean(formik.touched.password && formik.errors.password)}
                        fullWidth
                        helperText={formik.touched.password && formik.errors.password}
                        label="Contraseña"
                        margin="normal"
                        name="password"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="password"
                        value={formik.values.password}
                        variant="outlined"
                    />
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            ml: -1
                        }}
                    >
                        <Checkbox
                            checked={formik.values.policy}
                            name="policy"
                            onChange={formik.handleChange}
                        />
                        <Typography
                            color="textSecondary"
                            variant="body2"
                        >
                            He leído y acepto los
                            {' '}
                                <Link
                                    color="primary"
                                    underline="always"
                                    variant="subtitle2"
                                    href={'/terminos-y-condiciones'}
                                >
                                    Términos y condiciones
                                </Link>
                        </Typography>
                    </Box>
                    {Boolean(formik.touched.policy && formik.errors.policy) && (
                        <FormHelperText error>
                            {formik.errors.policy}
                        </FormHelperText>
                    )}
                    <Box sx={{py: 2}}>
                        <Button
                            color="primary"
                            disabled={loading}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                        >
                            Registrarse
                        </Button>
                    </Box>
                    <Typography
                        color="textSecondary"
                        variant="body2"
                    >
                        ¿Tiene una cuenta?
                        {' '}
                            <Link
                                variant="subtitle2"
                                underline="hover"
                                href={'/'}
                            >
                                Login
                            </Link>
                    </Typography>
                </form>
            </Container>
        </Box>
    );
};

export default Register;
