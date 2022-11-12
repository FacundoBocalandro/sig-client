import {Box, Container} from '@mui/material';
import {AppLayout} from "../components/layout/AppLayout";
import {PigListToolbar} from "./pig-list/PigListToolbar";
import {PigList} from "./pig-list/PigList";
import AddPigModal from "./add-pig/AddPigModal";
import React, {useEffect, useState} from "react";
import {useHttp} from "../providers/HttpProvider";
import toast from "react-hot-toast";
import {useAuthentication} from "../providers/AuthenticationProvider";
import {calculateFullAgeString} from "../utils/dates";
import {useNavigate} from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";

const Pigs = () => {
    const {get} = useHttp();
    const {isAuthenticated} = useAuthentication();
    const [pigs, setPigs] = useState([]);
    const [filteredPigs, setFilteredPigs] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            setLoading(true);
            get('pigs')
                .then(res => {
                    setLoading(false);
                    const newPigs = res.map(pig => {
                        const age = calculateFullAgeString(pig.birthDate);
                        return {
                            ...pig,
                            age
                        }
                    })
                    setPigs(newPigs)
                    setFilteredPigs(newPigs);
                })
                .catch(() => {
                    setLoading(false);
                    toast.error('¡Error cargando cerdas!')
                })
        }
    }, [get, isAuthenticated])

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const addPigCallback = (pig) => {
        setLoading(false);
        const age = calculateFullAgeString(pig.birthDate);
        setPigs([{...pig, age}, ...pigs]);
        if (pigIsInFilter(pig, searchText)) {
            setFilteredPigs([{...pig, age}, ...filteredPigs]);
        }
        navigate(`/cerdas/${pig.id}`)
    }

    const pigIsInFilter = (pig, text) => {
        return pig.pigId.toLowerCase().includes(text.toLowerCase());
    }

    const handleSearch = (text) => {
        setSearchText(text);
        setFilteredPigs(pigs.filter(pig => pigIsInFilter(pig, text)));
    }

    return (
        <AppLayout>
            <Box sx={{height: 5}}>
                {loading && <LinearProgress/>}
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth={false}>
                    <PigListToolbar handleOpen={handleOpen} handleSearch={handleSearch} searchText={searchText}/>
                    <AddPigModal open={open} handleClose={handleClose} addPigCallback={addPigCallback}
                                 setLoading={setLoading}/>
                    <Box sx={{mt: 3}}>
                        <PigList pigs={filteredPigs}/>
                    </Box>
                </Container>
            </Box>
        </AppLayout>
    );
}

export default Pigs
