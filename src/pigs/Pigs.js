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
    const [page, setPage] = useState(0);
    const {get} = useHttp();
    const {isAuthenticated} = useAuthentication();
    const [pigs, setPigs] = useState([]);
    const [filteredPigs, setFilteredPigs] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [activeStatusFilters, setActiveStatusFilters] = useState([]);

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
        if (pigIsInFilter(pig, searchText, activeStatusFilters)) {
            setFilteredPigs([{...pig, age}, ...filteredPigs]);
        }
        navigate(`/cerdas/${pig.id}`)
    }

    const pigIsInFilter = (pig, text, statusFilters) => {

        return pig.pigId.toLowerCase().includes(text.toLowerCase()) && (statusFilters.length === 0 || statusFilters.some(filter => filter === pig.pigStatus));
    }

    const handleSearch = (text) => {
        setSearchText(text);
        if (page !== 0) setPage(0);
        setFilteredPigs(pigs.filter(pig => pigIsInFilter(pig, text, activeStatusFilters)));
    }

    const handleFilter = (newFilter) => {
        const newActiveStatusFilters = activeStatusFilters.includes(newFilter) ? activeStatusFilters.filter(filter => filter !== newFilter) : [...activeStatusFilters, newFilter];
        setActiveStatusFilters(newActiveStatusFilters);
        if (page !== 0) setPage(0);
        setFilteredPigs(pigs.filter(pig => pigIsInFilter(pig, searchText, newActiveStatusFilters)));
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
                    <PigListToolbar handleOpen={handleOpen} handleSearch={handleSearch} searchText={searchText} handleFilter={handleFilter} activeStatusFilters={activeStatusFilters}/>
                    <AddPigModal open={open} handleClose={handleClose} addPigCallback={addPigCallback}
                                 setLoading={setLoading}/>
                    <Box sx={{mt: 3}}>
                        <PigList pigs={filteredPigs} page={page} setPage={setPage}/>
                    </Box>
                </Container>
            </Box>
        </AppLayout>
    );
}

export default Pigs
