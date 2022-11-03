import React, {useState} from 'react'
import Backdrop from "@mui/material/Backdrop";
import {Fade, Modal, Step, StepLabel, Stepper, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import Button from "@mui/material/Button";
import {useHttp} from "../../providers/HttpProvider";
import toast from "react-hot-toast";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '592px',
    height: '496px',
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
    fatherId: ''
}

const AddPigModal = ({open, handleClose, addPigCallback}) => {
    const [pig, setPig] = useState(INITIAL_PIG)
    const {post} = useHttp();

    const [activeStep, setActiveStep] = useState(0);

    const resetPig = () => {
        handleClose();
        setActiveStep(0);
        setPig(INITIAL_PIG);
    }

    const createPig = () => {
        post('pigs', pig)
            .then((res) => {
                addPigCallback(res);
                resetPig();
                toast.success('¡Cerda creada exitosamente!');
            })
            .catch(() => {
                toast.error('¡Error creando cerda!');
            })
    }

    return (
        <Modal
            open={open}
            onClose={resetPig}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
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
                                           onChange={e => setPig({...pig, pigId: e.target.value})}
                                           value={pig.pigId}/>
                                <DatePicker
                                    inputFormat="dd/MM/yyyy"
                                    value={pig.birthDate}
                                    onChange={birthDate => setPig({...pig, birthDate})}
                                    label={"Fecha de nacimiento"}
                                    maxDate={new Date()}
                                    renderInput={(params) => <TextField fullWidth required {...params} />}
                                />
                            </Box>
                            <Box style={buttonContainerStyle}>
                                <Button onClick={resetPig} variant={"outlined"}>Cancelar</Button>
                                <Button onClick={() => setActiveStep(1)} variant={"contained"}
                                        disabled={!pig.pigId || !pig.birthDate}>Continuar</Button>
                            </Box>
                        </>}
                        {activeStep === 1 && <>
                            <Box sx={fieldsContainerStyle}>
                                <TextField required label="Genéticas" variant="outlined" fullWidth
                                           onChange={e => setPig({...pig, genetics: e.target.value})}
                                           value={pig.genetics}/>
                                <TextField required label="Padre" variant="outlined" fullWidth
                                           onChange={e => setPig({...pig, fatherId: e.target.value})}
                                           value={pig.fatherId}/>
                            </Box>
                            <Box style={buttonContainerStyle}>
                                <Button onClick={() => setActiveStep(0)} variant={"outlined"}>Atrás</Button>
                                <Button variant={"contained"} disabled={!pig.fatherId || !pig.genetics}
                                        onClick={createPig}>Crear</Button>
                            </Box>
                        </>}
                    </Box>
                </Box>
            </Fade>
        </Modal>
    )
}

export default AddPigModal;
