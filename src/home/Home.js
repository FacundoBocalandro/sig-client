import React, {useEffect, useState} from 'react';
import {AppLayout} from "../components/layout/AppLayout";
import {Box, Container} from "@mui/material";
import {useHttp} from "../providers/HttpProvider";
import toast from "react-hot-toast";
import LinearProgress from "@mui/material/LinearProgress";
import {StatsList} from "./stats-list/StatsList";
import {useAuthentication} from "../providers/AuthenticationProvider";

const Home = () => {
    const [stats, setStats] = useState(null);
    const [objectives, setObjectives] = useState(null);
    const [loading, setLoading] = useState(false);
    const {get, put} = useHttp();
    const {isAuthenticated} = useAuthentication();

    useEffect(() => {
        if (isAuthenticated) {
            setLoading(true);
            get('dashboard/stats')
                .then(res => {
                    setLoading(false)
                    setStats(res.sort(() => -1));
                })
                .catch(() => {
                    setLoading(false)
                    toast.error("¡Error cargando estadísticas!")
                })

            get('dashboard/objectives')
                .then(res => {
                    setLoading(false)
                    setObjectives(res);
                })
                .catch(() => {
                    setLoading(false)
                    toast.error("¡Error cargando objetivos!")
                })
        }
    }, [get, isAuthenticated])

    const saveObjectives = (newObjectives) => {
        put(`dashboard/objectives/${newObjectives.id}`, newObjectives)
            .then(res => {
                setObjectives(res);
            })
            .catch(() => {
                toast.error("¡Error editando objetivos!");
            })
    }

    return(
            <AppLayout>
                <Box sx={{height: 10}}>
                    {loading && <LinearProgress/>}
                </Box>
                <Box
                    component="main"
                >
                    <Container maxWidth={false}>
                        <Box sx={{mt: 3}}>
                            {stats && objectives && <StatsList stats={stats} objectives={objectives} saveObjectives={saveObjectives}/>}
                        </Box>
                    </Container>
                </Box>
            </AppLayout>
    )
}

export default Home;
