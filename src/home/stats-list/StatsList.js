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
import _ from 'lodash';

const KPIS = [
    {accessor: 'weeklyServices', label: "Cerdas servidas"},
    {accessor: 'pregnancyPercentage', label: "Preñez"},
    {accessor: 'birthPerServicesPercentage', label: "Pariciones 1"},
    {accessor: 'birthPerPregnancyPercentage', label: "Pariciones 2"},
    {accessor: 'weeklyLivePigsPerBirth', label: "Nacimiento"},
    {accessor: 'weeklyWeanedPerBirth', label: "Destetados"},
    {accessor: 'weeklyDeathRate', label: "Mortandad"},
    {accessor: 'weeklyBirthWeight', label: "Peso nacimiento"},
    {accessor: 'weeklyWeanedWeight', label: "Peso destete"}
]

export const StatsList = ({stats, objectives, saveObjectives, ...rest}) => {
    const [tempObjectives, setTempObjectives] = useState(objectives);
    // eslint-disable-next-line
    const debounceChangeObjectives = useCallback(_.debounce((newObjectives) => {
        saveObjectives(newObjectives);
    }, 1000), []);

    const changeObjectives = (newObjectives) => {
        setTempObjectives(newObjectives);
        debounceChangeObjectives(newObjectives);
    }

    return (
        <Card {...rest}>
            <PerfectScrollbar>
                <Box sx={{minWidth: 1050}}>
                    <TableContainer sx={{maxWidth: '100%', width: '100%', overflowX: 'auto'}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell width={'10%'}>
                                        KPI
                                    </TableCell>
                                    {stats.map(stat => (<TableCell width={'8%'} key={stat.endDate}>
                                        {format(new Date(stat.endDate), 'dd/MM/yy')}
                                    </TableCell>))}
                                    <TableCell width={'10%'}>
                                        Objetivo
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {KPIS.map(kpi => (
                                    <TableRow>
                                        <TableCell><b>{kpi.label}</b></TableCell>
                                        {stats.map(stat => (
                                            <TableCell align={"center"}>{stat[kpi.accessor]}</TableCell>))}
                                        <TableCell>
                                            <TextField
                                                fullWidth
                                                variant={"outlined"}
                                                size={"small"}
                                                type={"number"}
                                                onChange={e => changeObjectives({...tempObjectives, [kpi.accessor]: e.target.value})}
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
