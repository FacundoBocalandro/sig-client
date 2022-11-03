import {useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Box, Button, Grid, Tab, Tabs, TextField, Typography} from '@mui/material';
import {Logo} from '../components/Logo';
import {useAuthentication, withReverseAuthentication} from "../providers/AuthenticationProvider";
import toast from "react-hot-toast";
import {getFirebaseErrorMessage} from "../utils/errors";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [tab, setTab] = useState('email')
    const {login, loading} = useAuthentication()
    const navigate = useNavigate();

    const successCallback = () => {
        navigate('/dashboard')
    }

    const errorCallback = (errorCode) => {
        toast.error(`¡Error de login! ${getFirebaseErrorMessage(errorCode)}`)
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email('El email debe ser válido')
                .max(255)
                .required('Debe ingresar un email'),
            password: Yup
                .string()
                .required('Debe ingresar una contraseña')
                .min(8, 'Contraseña muy corta - Debe tener al menos 8 carácteres.')
        }),
        onSubmit: async (values, helpers) => {
            login(values, successCallback, errorCallback);
        }
    });

    const handleTabChange = (event, value) => {
        setTab(value);
    };

    return (
        <Box
            component="main"
            sx={{
                display: 'flex',
                flex: '1 1 auto'
            }}
        >
            <Grid
                container
                sx={{flex: '1 1 auto'}}
            >
                <Grid
                    item
                    xs={12}
                    lg={6}
                    sx={{
                        backgroundColor: 'neutral.50',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative'
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            p: 3
                        }}
                    >

                        <Logo
                            sx={{
                                height: 42,
                                width: 42
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            flex: '1 1 auto',
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        <Box
                            sx={{
                                maxWidth: 500,
                                px: 3,
                                py: '100px',
                                width: '100%'
                            }}
                        >
                            <div>
                                <Typography
                                    sx={{mb: 1}}
                                    variant="h4"
                                >
                                    Bienvenido
                                </Typography>
                                <Typography
                                    color="text.secondary"
                                    sx={{mb: 3}}
                                    variant="body2"
                                >
                                    Ingrese a la plataforma de seguimiento de cerdas
                                </Typography>
                                <Tabs
                                    onChange={handleTabChange}
                                    sx={{mb: 3}}
                                    value={tab}
                                >
                                    <Tab
                                        label="Email"
                                        value="email"
                                    />
                                    <Tab
                                        label="Teléfono"
                                        value="phoneNumber"
                                    />
                                </Tabs>
                                {tab === 'email' && (
                                    <div>
                                        <TextField
                                            error={Boolean(formik.touched.email && formik.errors.email)}
                                            fullWidth
                                            helperText={formik.touched.email && formik.errors.email}
                                            label="Correo electrónico"
                                            name="email"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            type="email"
                                            value={formik.values.email}
                                            variant="outlined"
                                            sx={{marginBottom: 1}}
                                        />
                                        <TextField
                                            error={Boolean(formik.touched.password && formik.errors.password)}
                                            fullWidth
                                            helperText={formik.touched.password && formik.errors.password}
                                            label="Contraseña"
                                            name="password"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            type="password"
                                            value={formik.values.password}
                                            variant="outlined"
                                        />
                                        {formik.errors.submit && (
                                            <Typography
                                                color="error"
                                                sx={{mt: 2}}
                                                variant="body2"
                                            >
                                                {formik.errors.submit}
                                            </Typography>
                                        )}
                                        <Button
                                            fullWidth
                                            size="large"
                                            sx={{mt: 3}}
                                            onClick={() => formik.handleSubmit()}
                                            variant="contained"
                                            disabled={loading}
                                        >
                                            Continuar
                                        </Button>
                                        <Button
                                            fullWidth
                                            size="large"
                                            sx={{ mt: 3 }}
                                            onClick={() => navigate('/registro')}
                                        >
                                            Registrarse
                                        </Button>
                                    </div>
                                )}
                                {tab === 'phoneNumber' && (
                                    <div>
                                        <Typography
                                            sx={{mb: 1}}
                                            variant="h6"
                                        >
                                            No disponible
                                        </Typography>
                                        <Typography color="text.secondary">
                                            Próximamente en la plataforma...
                                        </Typography>
                                    </div>
                                )}
                            </div>
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={12}
                    lg={6}
                    sx={{
                        alignItems: 'center',
                        background: 'radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        '& img': {
                            maxWidth: '100%'
                        }
                    }}
                >
                    <Box sx={{p: 3}}>
                        <Typography
                            align="center"
                            color="inherit"
                            sx={{
                                fontSize: '24px',
                                lineHeight: '32px',
                                mb: 1
                            }}
                            variant="h1"
                        >
                            Seguimiento de cerdas
                        </Typography>
                        <Typography
                            align="center"
                            sx={{mb: 3}}
                            variant="subtitle1"
                        >
                            Registre sus cerdas, haga el seguimiento y observe las estadísticas totales e individuales.
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default withReverseAuthentication(Login);
