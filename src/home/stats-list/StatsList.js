import PerfectScrollbar from 'react-perfect-scrollbar';
import {format} from 'date-fns';
import {
    Box,
    Card,
    Table,
    TableBody,
    TableCell, TableContainer,
    TableHead,
    TableRow, TextField,
} from '@mui/material';
import {useCallback, useState} from "react";
import _, {round} from 'lodash';
import {AveragePill} from "./AveragePill";

const SENSE = {
    STABLE: "STABLE",
    GROWING: "GROWING",
    DECREASING: "DECREASING"
}

const KPIS = [
    {accessor: 'weeklyServices', label: "Cerdas servidas", sense: SENSE.STABLE},
    {accessor: 'pregnancyPercentage', label: "Preñez", sense: SENSE.GROWING},
    {accessor: 'birthPerServicesPercentage', label: "Pariciones 1", sense: SENSE.GROWING},
    {accessor: 'birthPerPregnancyPercentage', label: "Pariciones 2", sense: SENSE.GROWING},
    {accessor: 'weeklyLivePigsPerBirth', label: "Nacimiento", sense: SENSE.GROWING},
    {accessor: 'weeklyWeanedPerBirth', label: "Destetados", sense: SENSE.GROWING},
    {accessor: 'weeklyDeathRate', label: "Mortandad", sense: SENSE.DECREASING},
    {accessor: 'weeklyBirthWeight', label: "Peso nacimiento", sense: SENSE.GROWING},
    {accessor: 'weeklyWeanedWeight', label: "Peso destete", sense: SENSE.GROWING}
]

export const StatsList = ({stats, objectives, saveObjectives, ...rest}) => {
    const [tempObjectives, setTempObjectives] = useState(objectives);
    // eslint-disable-next-line
    const debounceChangeObjectives = useCallback(_.debounce((newObjectives) => {
        saveObjectives(newObjectives);
    }, 1000), []);

    const changeObjectives = (field, value) => {
        setTempObjectives({...tempObjectives, [field]: value});
        debounceChangeObjectives({[field]: value !== "" ? value : 0, id: tempObjectives.id});
    }

    return (
        <Card {...rest}>
            <PerfectScrollbar>
                <Box sx={{minWidth: 1050}}>
                    <TableContainer sx={{maxWidth: '100%', width: '100%', overflowX: 'auto'}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell width={'10%'} sx={{position: 'sticky', left: 0, zIndex: 1, background: '#F3F4F6'}}>
                                        KPI
                                    </TableCell>
                                    {stats.statsPerWeek.map(stat => (<TableCell width={'7%'} key={stat.endDate}>
                                        {format(new Date(stat.endDate), 'dd/MM/yy')}
                                    </TableCell>))}
                                    <TableCell width={'10%'} sx={{position: 'sticky', right: '10%', zIndex: 1, background: '#F3F4F6'}}>
                                        Promedio
                                    </TableCell>
                                    <TableCell width={'10%'} sx={{position: 'sticky', right: 0, zIndex: 1, background: '#F3F4F6'}}>
                                        Objetivo
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {KPIS.map(kpi => (
                                    <TableRow>
                                        <TableCell sx={{position: 'sticky', left: 0, zIndex: 1, background: '#fff'}}><b>{kpi.label}</b></TableCell>
                                        {stats.statsPerWeek.map(stat => (
                                            <TableCell align={"center"}>{stat[kpi.accessor].toFixed(2)}</TableCell>))}
                                        <TableCell align={"center"} sx={{position: 'sticky', right: '10%', zIndex: 1, background: '#fff'}}>
                                            <AveragePill color={getStatusColor(round(Number(stats.average[kpi.accessor]), 2), Number(tempObjectives[kpi.accessor]), kpi.sense)}>{stats.average[kpi.accessor].toFixed(2)}</AveragePill>
                                        </TableCell>
                                        <TableCell sx={{position: 'sticky', right: 0, zIndex: 1, background: '#fff'}}>
                                            <TextField
                                                fullWidth
                                                variant={"outlined"}
                                                size={"small"}
                                                type={"number"}
                                                onChange={e => changeObjectives(kpi.accessor, e.target.value)}
                                                onBlur={e => saveObjectives({[kpi.accessor]: e.target.value !== "" ? e.target.value : 0, id: tempObjectives.id})}
                                                value={tempObjectives[kpi.accessor]}/>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </PerfectScrollbar>
        </Card>
    );
};

const getStatusColor = (average, objective, sense) => {
    switch (sense) {
        case SENSE.GROWING:
            return average > objective ? 'success' : 'error';
        case SENSE.DECREASING:
            return average < objective ? 'success' : 'error';
        case SENSE.STABLE:
            return Math.abs(average - objective) < 2 ? 'success' : 'error';
        default:
            return 'info';
    }
}
