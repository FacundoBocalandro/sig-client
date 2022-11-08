import React, {useState} from 'react'
import Backdrop from "@mui/material/Backdrop";
import {Fade, Modal, Step, StepLabel, Stepper, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import Button from "@mui/material/Button";
import {useHttp} from "../../providers/HttpProvider";
import toast from "react-hot-toast";
import {useFormik} from "formik";
import * as Yup from "yup";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '592px',
    height: '592px',
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    padding: 0
};

const contentStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    flex: 1,
    padding: '32px'
}

const headerStyle = {
    backgroundColor: 'primary.main',
    color: '#fff',
    width: '100%',
    height: 64,
    display: 'flex',
    alignItems: 'center',
    borderTopRightRadius: '10px',
    borderTopLeftRadius: '10px',
    paddingLeft: '16px'
}

const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-around'
}

const fieldsContainerStyle = {
    display: 'grid',
    gridGap: 32
}

const STEPS = ['Información Básica', 'Información Extra']

const INITIAL_PIG = {
    pigId: '',
    birthDate: new Date(),
    genetics: '',
    fatherId: '',
    motherId: '',
}

const AddPigModal = ({open, handleClose, addPigCallback, setLoading}) => {
    const {post} = useHttp();

    const close = () => {
        handleClose();
        setActiveStep(0);
    }

    const formik = useFormik({
        initialValues: INITIAL_PIG,
        validationSchema: Yup.object({
            pigId: Yup
                .string()
                .max(255)
                .required('Debe ingresar un ID'),
            genetics: Yup
                .string()
                .max(255)
                .required('Debe ingresar genéticas')
                .matches('^([A-Z])([A-Z])(\\d)(\\d)(\\d)(\\d)$', "El formato no es válido - Debe ser 2 letras y 4 números"),
        }),
        onSubmit: (values, formikHelpers) => {
            setLoading(true);
            post('pigs', values)
                .then((res) => {
                    addPigCallback(res);
                    close();
                    formikHelpers.resetForm();
                    toast.success('¡Cerda creada exitosamente!');
                })
                .catch(() => {
                    setLoading(false);
                    toast.error('¡Error creando cerda!');
                })
        }
    });

    const [activeStep, setActiveStep] = useState(0);


    console.log(formik.errors)
    return (
        <Modal
            open={open}
            onClose={close}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <form
                autoComplete="off"
                noValidate
                onSubmit={formik.handleSubmit}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Box sx={headerStyle}>
                            <Typography id="transition-modal-title" variant="h6" component="h2">
                                Agregar cerda
                            </Typography>
                        </Box>
                        <Box sx={contentStyle}>
                            <Stepper activeStep={activeStep}>
                                {STEPS.map((label, index) => {
                                    return (
                                        <Step key={label}>
                                            <StepLabel>{label}</StepLabel>
                                        </Step>
                                    );
                                })}
                            </Stepper>
                            {activeStep === 0 && <>
                                <Box sx={fieldsContainerStyle}>
                                    <TextField label="Número de identificación" variant="outlined" fullWidth required
                                               name="pigId"
                                               error={Boolean(formik.touched.pigId && formik.errors.pigId)}
                                               helperText={formik.touched.pigId && formik.errors.pigId}
                                               onBlur={formik.handleBlur}
                                               onChange={formik.handleChange}
                                               value={formik.values.pigId}/>
                                    <DatePicker
                                        inputFormat="dd/MM/yyyy"
                                        name="birthDate"
                                        error={Boolean(formik.touched.birthDate && formik.errors.birthDate)}
                                        helperText={formik.touched.birthDate && formik.errors.birthDate}
                                        onBlur={formik.handleBlur}
                                        onChange={value => formik.setFieldValue('birthDate', value)}
                                        value={formik.values.birthDate}
                                        label={"Fecha de nacimiento"}
                                        maxDate={new Date()}
                                        renderInput={(params) => <TextField fullWidth required {...params} />}
                                    />
                                    <TextField required label="Genéticas" variant="outlined" fullWidth
                                               name="genetics"
                                               error={Boolean(formik.touched.genetics && formik.errors.genetics)}
                                               helperText={formik.touched.genetics && formik.errors.genetics}
                                               onBlur={formik.handleBlur}
                                               onChange={e => formik.setFieldValue('genetics', e.target.value.replace(/\s/g, '').toUpperCase())}
                                               value={formik.values.genetics}/>
                                </Box>
                                <Box style={buttonContainerStyle}>
                                    <Button onClick={() => {
                                        close();
                                        formik.resetForm();
                                    }} variant={"outlined"}>Cancelar</Button>
                                    <Button onClick={() => setActiveStep(1)} variant={"contained"}
                                            disabled={!formik.values.pigId || !formik.values.birthDate || !formik.values.genetics || Object.values(formik.errors).length > 0}>Continuar</Button>
                                </Box>
                            </>}
                            {activeStep === 1 && <>
                                <Box sx={fieldsContainerStyle}>
                                    <TextField label="Padre" variant="outlined" fullWidth
                                               name="fatherId"
                                               error={Boolean(formik.touched.fatherId && formik.errors.fatherId)}
                                               helperText={formik.touched.fatherId && formik.errors.fatherId}
                                               onBlur={formik.handleBlur}
                                               onChange={formik.handleChange}
                                               value={formik.values.fatherId}/>
                                    <TextField label="Madre" variant="outlined" fullWidth
                                               name="motherId"
                                               error={Boolean(formik.touched.motherId && formik.errors.motherId)}
                                               helperText={formik.touched.motherId && formik.errors.motherId}
                                               onBlur={formik.handleBlur}
                                               onChange={formik.handleChange}
                                               value={formik.values.motherId}/>
                                </Box>
                                <Box style={buttonContainerStyle}>
                                    <Button onClick={() => setActiveStep(0)} variant={"outlined"}>Atrás</Button>
                                    <Button variant={"contained"} type={'submit'}>Crear</Button>
                                </Box>
                            </>}
                        </Box>
                    </Box>
                </Fade>
            </form>
        </Modal>
    )
}

export default AddPigModal;
