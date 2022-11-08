import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField, Typography
} from '@mui/material';
import {format} from "date-fns";
import {useFormik} from "formik";
import * as Yup from "yup";
import {CYCLE_STATUS} from "../../../constants/cycle";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import React from "react";
import {getEstimatedBirthDate} from "../../../utils/dates";

const CycleDetails = ({cycle, changeCycle, ...props}) => {
    const formik = useFormik({
        initialValues: cycle,
        enableReinitialize: true,
        validationSchema: Yup.object({
            cycleStatus: Yup.string()
                .oneOf(Object.values(CYCLE_STATUS)),
            semen: Yup.string()
                .nullable(true)
                .when('cycleStatus', {
                    is: CYCLE_STATUS.CLOSED,
                    then: Yup.string().nullable(true).required('Debe ingresar el semen utilizado')
                }),
            services: Yup.number()
                .positive('El número debe ser positivo')
                .integer('El número debe ser entero')
                .max(2, 'Máximo 2')
                .min(0, 'Mínimo 0')
                .nullable(true)
                .when('cycleStatus', {
                    is: CYCLE_STATUS.CLOSED,
                    then: Yup.number().positive('El número debe ser positivo')
                        .integer('El número debe ser entero')
                        .max(2, 'Máximo 2')
                        .min(0, 'Mínimo 0')
                        .nullable(true)
                        .required('Debe ingresar los servicios')
                }),
            zealDetection: Yup.number()
                .positive('El número debe ser positivo')
                .integer('El número debe ser entero')
                .max(7, 'Máximo 7')
                .min(0, 'Mínimo 0')
                .nullable(true)
                .when('cycleStatus', {
                    is: CYCLE_STATUS.CLOSED,
                    then: Yup.number().positive('El número debe ser positivo')
                        .integer('El número debe ser entero')
                        .max(7, 'Máximo 7')
                        .min(0, 'Mínimo 0')
                        .nullable(true)
                        .required('Debe ingresar las montas')
                }),
            liveBirths: Yup.number()
                .positive('El número debe ser positivo')
                .integer('El número debe ser entero')
                .nullable(true)
                .when('cycleStatus', {
                    is: CYCLE_STATUS.CLOSED,
                    then: Yup.number()
                        .positive('El número debe ser positivo')
                        .integer('El número debe ser entero')
                        .nullable(true)
                        .required('Debe ingresar los nacidos vivos')
                }),
            pigletLosses: Yup.number()
                .positive('El número debe ser positivo')
                .integer('El número debe ser entero')
                .nullable(true)
                .when('cycleStatus', {
                    is: CYCLE_STATUS.CLOSED,
                    then: Yup.number().positive('El número debe ser positivo')
                        .integer('El número debe ser entero')
                        .nullable(true)
                        .required('Debe ingresar los nacidos muertos')
                }),
            pigletLossesAfterBirth: Yup.number()
                .positive('El número debe ser positivo')
                .integer('El número debe ser entero')
                .nullable(true)
                .when('cycleStatus', {
                    is: CYCLE_STATUS.CLOSED,
                    then: Yup.number().positive('El número debe ser positivo')
                        .integer('El número debe ser entero')
                        .nullable(true)
                        .required('Debe ingresar las bajas de lechones')
                }),
            weaned: Yup.number()
                .positive('El número debe ser positivo')
                .integer('El número debe ser entero')
                .nullable(true)
                .when('cycleStatus', {
                    is: CYCLE_STATUS.CLOSED,
                    then: Yup.number().positive('El número debe ser positivo')
                        .integer('El número debe ser entero')
                        .nullable(true)
                        .required('Debe ingresar los destetados')
                }),
            averageBirthWeight: Yup.number()
                .positive('El número debe ser positivo')
                .nullable(true)
                .when('cycleStatus', {
                    is: CYCLE_STATUS.CLOSED,
                    then: Yup.number().positive('El número debe ser positivo')
                        .nullable(true)
                        .required('Debe ingresar el peso promedio de nacimiento')
                }),
            averageWeaningWeight: Yup.number()
                .positive('El número debe ser positivo')
                .nullable(true)
                .when('cycleStatus', {
                    is: CYCLE_STATUS.CLOSED,
                    then: Yup.number().positive('El número debe ser positivo')
                        .nullable(true)
                        .required('Debe ingresar el peso promedio de destetados')
                }),
        }),
        onSubmit: (values) => {
            changeCycle(values);
        }
    });

    const confirmPregnancy = () => {
        formik.setValues({...formik.values, pregnancyDate: new Date(), cycleStatus: CYCLE_STATUS.PREGNANT})
    }

    const confirmBirth = () => {
        formik.setValues({...formik.values, birthDate: new Date(), cycleStatus: CYCLE_STATUS.BIRTH_CONFIRMED})
    }

    const closeCycle = () => {
        formik.setValues({...formik.values, closeDate: new Date(), cycleStatus: CYCLE_STATUS.CLOSED})
    }


    const getButtonAction = (cycleStatus) => {
        switch (cycleStatus) {
            case CYCLE_STATUS.STARTED:
                return confirmPregnancy;
            case CYCLE_STATUS.PREGNANT:
                return confirmBirth;
            case CYCLE_STATUS.BIRTH_CONFIRMED:
                return closeCycle;
            default:
                return null;
        }
    }

    return (
        <form
            autoComplete="off"
            noValidate
            onSubmit={formik.handleSubmit}
            {...props}
        >
            <Card>
                <CardHeader
                    subheader="La información puede ser editada."
                    title={`Fecha: ${format(new Date(cycle.created_at), 'dd/MM/yyyy')}`}
                />
                <Divider/>
                <CardContent>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Semen"
                                name="semen"
                                error={Boolean(formik.touched.semen && formik.errors.semen)}
                                helperText={formik.touched.semen && formik.errors.semen}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.semen}
                                variant="outlined"
                                key={formik.values.id}
                                disabled={cycle.cycleStatus === CYCLE_STATUS.CLOSED}
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Servicios"
                                name="services"
                                type="number"
                                InputProps={{inputProps: {min: 0, max: 2}}}
                                error={Boolean(formik.touched.services && formik.errors.services)}
                                helperText={formik.touched.services && formik.errors.services}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.services}
                                variant="outlined"
                                key={formik.values.id}
                                disabled={cycle.cycleStatus === CYCLE_STATUS.CLOSED}
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Montas"
                                name="zealDetection"
                                type="number"
                                InputProps={{inputProps: {min: 0, max: 7}}}
                                error={Boolean(formik.touched.zealDetection && formik.errors.zealDetection)}
                                helperText={formik.touched.zealDetection && formik.errors.zealDetection}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.zealDetection}
                                variant="outlined"
                                key={formik.values.id}
                                disabled={cycle.cycleStatus === CYCLE_STATUS.CLOSED}
                            />
                        </Grid>
                        {[CYCLE_STATUS.PREGNANT, CYCLE_STATUS.BIRTH_CONFIRMED, CYCLE_STATUS.CLOSED].includes(formik.values.cycleStatus) &&
                        <>
                            <Grid item xs={12}>
                                <Divider/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <DatePicker
                                    inputFormat="dd/MM/yyyy"
                                    name="pregnancyDate"
                                    error={Boolean(formik.touched.pregnancyDate && formik.errors.pregnancyDate)}
                                    helperText={formik.touched.pregnancyDate && formik.errors.pregnancyDate}
                                    onBlur={formik.handleBlur}
                                    onChange={value => formik.setFieldValue('pregnancyDate', value)}
                                    value={formik.values.pregnancyDate}
                                    label={"Fecha de preñez"}
                                    maxDate={new Date()}
                                    disabled={cycle.cycleStatus === CYCLE_STATUS.CLOSED}
                                    renderInput={(params) => <TextField fullWidth required {...params} />}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box sx={{display: 'flex', alignItems: 'center', height: '100%'}}>
                                    <Typography>Fecha estimada de
                                        parto: <b>{format(getEstimatedBirthDate(formik.values.pregnancyDate), 'dd/MM/yyyy')}</b></Typography>
                                </Box>
                            </Grid>
                        </>}
                        {[CYCLE_STATUS.BIRTH_CONFIRMED, CYCLE_STATUS.CLOSED].includes(formik.values.cycleStatus) && <>
                            <Grid item xs={12}>
                                <Divider/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <DatePicker
                                    inputFormat="dd/MM/yyyy"
                                    name="birthDate"
                                    error={Boolean(formik.touched.birthDate && formik.errors.birthDate)}
                                    helperText={formik.touched.birthDate && formik.errors.birthDate}
                                    onBlur={formik.handleBlur}
                                    onChange={value => formik.setFieldValue('birthDate', value)}
                                    value={formik.values.birthDate}
                                    label={"Fecha de parto"}
                                    minDate={formik.values.pregnancyDate}
                                    disabled={cycle.cycleStatus === CYCLE_STATUS.CLOSED}
                                    renderInput={(params) => <TextField fullWidth required {...params} />}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}/>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Nac. vivos"
                                    name="liveBirths"
                                    type="number"
                                    InputProps={{inputProps: {min: 0}}}
                                    error={Boolean(formik.touched.liveBirths && formik.errors.liveBirths)}
                                    helperText={formik.touched.liveBirths && formik.errors.liveBirths}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.liveBirths}
                                    variant="outlined"
                                    key={formik.values.id}
                                    disabled={cycle.cycleStatus === CYCLE_STATUS.CLOSED}
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Nac. muertos"
                                    name="pigletLosses"
                                    type="number"
                                    InputProps={{inputProps: {min: 0}}}
                                    error={Boolean(formik.touched.pigletLosses && formik.errors.pigletLosses)}
                                    helperText={formik.touched.pigletLosses && formik.errors.pigletLosses}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.pigletLosses}
                                    variant="outlined"
                                    key={formik.values.id}
                                    disabled={cycle.cycleStatus === CYCLE_STATUS.CLOSED}
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Bajas lechones"
                                    name="pigletLossesAfterBirth"
                                    type="number"
                                    InputProps={{inputProps: {min: 0}}}
                                    error={Boolean(formik.touched.pigletLossesAfterBirth && formik.errors.pigletLossesAfterBirth)}
                                    helperText={formik.touched.pigletLossesAfterBirth && formik.errors.pigletLossesAfterBirth}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.pigletLossesAfterBirth}
                                    variant="outlined"
                                    key={formik.values.id}
                                    disabled={cycle.cycleStatus === CYCLE_STATUS.CLOSED}
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Destetados"
                                    name="weaned"
                                    type="number"
                                    InputProps={{inputProps: {min: 0}}}
                                    error={Boolean(formik.touched.weaned && formik.errors.weaned)}
                                    helperText={formik.touched.weaned && formik.errors.weaned}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.weaned}
                                    variant="outlined"
                                    key={formik.values.id}
                                    disabled={cycle.cycleStatus === CYCLE_STATUS.CLOSED}
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Peso Prom. a Nacimiento (kg)"
                                    name="averageBirthWeight"
                                    type="number"
                                    InputProps={{inputProps: {min: 0}}}
                                    error={Boolean(formik.touched.averageBirthWeight && formik.errors.averageBirthWeight)}
                                    helperText={formik.touched.averageBirthWeight && formik.errors.averageBirthWeight}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.averageBirthWeight}
                                    variant="outlined"
                                    key={formik.values.id}
                                    disabled={cycle.cycleStatus === CYCLE_STATUS.CLOSED}
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Peso Prom. a Destete (kg)"
                                    name="averageWeaningWeight"
                                    type="number"
                                    InputProps={{inputProps: {min: 0}}}
                                    error={Boolean(formik.touched.averageWeaningWeight && formik.errors.averageWeaningWeight)}
                                    helperText={formik.touched.averageWeaningWeight && formik.errors.averageWeaningWeight}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.averageWeaningWeight}
                                    variant="outlined"
                                    key={formik.values.id}
                                    disabled={cycle.cycleStatus === CYCLE_STATUS.CLOSED}
                                />
                            </Grid>
                            {formik.values.cycleStatus === CYCLE_STATUS.CLOSED && <>
                                <Grid item xs={12}>
                                    <Divider/>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <DatePicker
                                        inputFormat="dd/MM/yyyy"
                                        name="closeDate"
                                        error={Boolean(formik.touched.closeDate && formik.errors.closeDate)}
                                        helperText={formik.touched.closeDate && formik.errors.closeDate}
                                        onBlur={formik.handleBlur}
                                        onChange={value => formik.setFieldValue('closeDate', value)}
                                        value={formik.values.closeDate}
                                        label={"Fecha de cierre de ciclo"}
                                        minDate={formik.values.birthDate}
                                        disabled={cycle.cycleStatus === CYCLE_STATUS.CLOSED}
                                        renderInput={(params) => <TextField fullWidth required {...params} />}
                                    />
                                </Grid></>}
                        </>}
                    </Grid>
                </CardContent>
                <Divider/>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        p: 2,
                        gap: '24px'
                    }}
                >
                    {formik.values.cycleStatus !== CYCLE_STATUS.CLOSED && <Button
                        color="primary"
                        variant="contained"
                        onClick={getButtonAction(formik.values.cycleStatus)}
                    >
                        {getButtonLabel(formik.values.cycleStatus)}
                    </Button>}
                    <Button
                        color="primary"
                        variant="contained"
                        type={"submit"}
                        disabled={cycle.cycleStatus === CYCLE_STATUS.CLOSED}
                    >
                        Guardar
                    </Button>
                </Box>
            </Card>
        </form>
    );
};

const getButtonLabel = (cycleStatus) => {
    switch (cycleStatus) {
        case CYCLE_STATUS.STARTED:
            return "Confirmar preñez";
        case CYCLE_STATUS.PREGNANT:
            return "Confirmar parto";
        case CYCLE_STATUS.BIRTH_CONFIRMED:
            return "Cerrar ciclo";
        default:
            return "";
    }
}

export default CycleDetails
