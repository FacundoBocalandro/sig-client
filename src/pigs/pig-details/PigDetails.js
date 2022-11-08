import {Box, Button, Container, Grid, Link, Tab, Tabs, Typography} from '@mui/material';
import {AppLayout} from "../../components/layout/AppLayout";
import PigBasicDetails from "./pig-basic/PigBasicDetails";
import CycleDetails from "./cycle-details/CycleDetails";
import {useCallback, useEffect, useMemo, useState} from "react";
import {useAuthentication} from "../../providers/AuthenticationProvider";
import {useHttp} from "../../providers/HttpProvider";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import toast from "react-hot-toast";
import {calculateFullAgeString} from "../../utils/dates";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LinearProgress from '@mui/material/LinearProgress';
import {CYCLE_STATUS} from "../../constants/cycle";
import {PIG_STATUS} from "../pig-list/PigList";

const PigDetails = () => {
    const [cycles, setCycles] = useState([]);
    const [basicInformation, setBasicInformation] = useState(null);
    const {isAuthenticated} = useAuthentication();
    const {get, post, put} = useHttp();
    const pigId = useParams().id
    const [selectedCycle, setSelectedCycle] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const getPigBasicInfo = useCallback(() => {
        get(`pigs/${pigId}`)
            .then(res => {
                setLoading(false);
                const age = calculateFullAgeString(res.birthDate);
                setBasicInformation({...res, age})
            })
            .catch(() => {
                setLoading(false);
                toast.error('¡Error al cargar información de cerda!')
            })
    }, [get, pigId])

    useEffect(() => {
        if (isAuthenticated) {
            setLoading(true);
            get(`cycles/${pigId}`)
                .then(res => {
                    setLoading(false);
                    const cycles = res.sort((a, b) => a.cycleNumber - b.cycleNumber);
                    if (cycles.length > 0) setSelectedCycle(cycles[cycles.length - 1].id);
                    setCycles(cycles)
                })
                .catch(() => {
                    setLoading(false);
                    toast.error('¡Error al cargar ciclos!')
                })
            getPigBasicInfo();
        }
    }, [get, getPigBasicInfo, isAuthenticated, pigId])

    const addCycle = () => {
        const cycle = {
            cycleNumber: cycles.length,
            pig: pigId,
        }

        setLoading(true);

        post('cycles', cycle)
            .then(res => {
                setLoading(false);
                setCycles([...cycles, res]);
                setSelectedCycle(res.id);
            })
            .catch(() => {
                setLoading(false);
                toast.error("¡Error agregando ciclo!")
            })
    }

    const addCycleIfPossible = () => {
        if (cycles.length === 7) toast.error("¡El máximo de ciclos es 7!")
        else if (cycles.length === 0 || cycles[cycles.length - 1].cycleStatus === CYCLE_STATUS.CLOSED) addCycle()
        else toast.error("¡Debe cerrar el ciclo previo!")
    }

    const changeCycle = (updatedCycle) => {
        setLoading(true);
        put('cycles', {...updatedCycle, pig: pigId})
            .then(res => {
                setLoading(false);
                setCycles(cycles.map(cycle => {
                    if (cycle.id === updatedCycle.id) return res;
                    return cycle;
                }))
                if (res.cycleStatus === CYCLE_STATUS.CLOSED) {
                    getPigBasicInfo();
                }
                toast.success('¡Guardado exitoso!')
            })
            .catch(() => {
                setLoading(false);
                toast.error("¡Error modificando ciclo!")
            })
    }

    const discardPig = () => {
        setLoading(true);
        put(`pigs/discard/${pigId}`)
            .then(() => {
                setLoading(false);
                toast.success("¡Cerda descartada exitosamente!")
                navigate('/cerdas')
            })
            .catch(() => {
                setLoading(false);
                toast.error("¡Error descartando cerda!")
            })
    }

    const lastBirth = useMemo(() => {
        if (cycles.length > 0) return cycles[cycles.length - 1].created_at;
        return null;
    }, [cycles])

    if (basicInformation && basicInformation.pigStatus === PIG_STATUS.DISCARDED) {
        return <Navigate to={'/cerdas'}/>
    }
    return (
        <AppLayout>
            <Box sx={{height: 5}}>
                {loading && <LinearProgress/>}
            </Box>
            <Link
                href="/cerdas"
                variant="subtitle2"
                underline="hover"
                sx={{
                    position: 'absolute',
                    marginLeft: '24px',
                    marginTop: '12px'
                }}
            >
                <Button
                    component="a"
                    startIcon={<ArrowBackIcon fontSize="small"/>}
                >
                    Cerdas
                </Button>
            </Link>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Container maxWidth="lg">
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            lg={4}
                            md={6}
                            xs={12}
                        >
                            <Typography
                                sx={{mb: 3}}
                                variant="h4"
                            >
                                Cerda
                            </Typography>
                            {basicInformation &&
                            <PigBasicDetails basicInformation={basicInformation} addCycle={addCycleIfPossible}
                                             lastBirth={lastBirth}/>}
                        </Grid>
                        <Grid
                            item
                            lg={8}
                            md={6}
                            xs={12}
                        >
                            <Grid container>
                                <Grid item xs={12} md={7} lg={9}>
                                    <Tabs
                                        onChange={(event, value) => setSelectedCycle(value)}
                                        sx={{mb: 3}}
                                        value={selectedCycle}
                                        variant={"scrollable"}
                                    >
                                        {cycles.map(cycle => (<Tab label={`Ciclo ${cycle.cycleNumber}`} value={cycle.id}/>))}
                                    </Tabs>
                                </Grid>
                                <Grid item xs={12} md={5} lg={3}>
                                    <Button
                                        color="error"
                                        fullWidth
                                        variant="contained"
                                        onClick={discardPig}
                                    >
                                        Descartar cerda
                                    </Button>
                            </Grid>
                            </Grid>
                            {selectedCycle && <CycleDetails cycle={cycles.find(cycle => cycle.id === selectedCycle)}
                                                            changeCycle={changeCycle}/>}
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </AppLayout>
    );
}

export default PigDetails;
