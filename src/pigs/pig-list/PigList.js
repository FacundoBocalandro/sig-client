import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { format } from 'date-fns';
import {
    Box,
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from '@mui/material';
import {useNavigate} from "react-router-dom";
import {StatusPill} from "./StatusPill";
import toast from "react-hot-toast";

export const PIG_STATUS = {
    CUB: "CUB",
    IN_CYCLE: "IN_CYCLE",
    PREGNANT: "PREGNANT",
    RECENT_BIRTH: "RECENT_BIRTH",
    DISCARDED: "DISCARDED"
}

const STATUS_COLORS = {
    CUB: "secondary",
    IN_CYCLE: "info",
    PREGNANT: "success",
    RECENT_BIRTH: "warning",
    DISCARDED: "error"
}

const STATUS_LABELS = {
    CUB: "Cachorra",
    IN_CYCLE: "En ciclo",
    PREGNANT: "Preñada",
    RECENT_BIRTH: "Parto reciente",
    DISCARDED: "Descartada"
}

export const PigList = ({ pigs, ...rest }) => {
    const navigate = useNavigate();
    const [limit, setLimit] = useState(20);
    const [page, setPage] = useState(0);

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <Card {...rest}>
            <PerfectScrollbar>
                <Box sx={{ minWidth: 1050 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell width={'20%'}>
                                    ID
                                </TableCell>
                                <TableCell width={'20%'}>
                                    Edad
                                </TableCell>
                                <TableCell width={'20%'}>
                                    Genéticas
                                </TableCell>
                                <TableCell width={'20%'}>
                                    Fecha de ingreso
                                </TableCell>
                                <TableCell width={'20%'}>
                                    Estado
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pigs.slice(limit*page, limit*page + limit).map((pig) => (
                                <TableRow
                                    hover
                                    key={pig.id}
                                    onClick={() => {
                                        if (pig.pigStatus !== PIG_STATUS.DISCARDED) {
                                            navigate(`/cerdas/${pig.id}`)
                                        } else toast.error("¡La cerda está descartada!")

                                    }}
                                    sx={{
                                        "&:hover": {
                                            cursor: pig.pigStatus === PIG_STATUS.DISCARDED ? 'auto' : "pointer",
                                        }
                                    }}
                                >
                                    <TableCell>
                                        <Box
                                            sx={{
                                                alignItems: 'center',
                                                display: 'flex'
                                            }}
                                        >
                                            <Typography
                                                color="textPrimary"
                                                variant="body1"
                                            >
                                                {pig.pigId}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        {pig.age}
                                    </TableCell>
                                    <TableCell>
                                        {pig.genetics}
                                    </TableCell>
                                    <TableCell>
                                        {format(new Date(pig.created_at), 'dd/MM/yyyy')}
                                    </TableCell>
                                    <TableCell>
                                        <StatusPill
                                            color={STATUS_COLORS[pig.pigStatus]}
                                        >
                                            {STATUS_LABELS[pig.pigStatus]}
                                        </StatusPill>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
            <TablePagination
                component="div"
                count={pigs.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[20, 25, 50]}
                labelDisplayedRows={
                    ({ from, to, count }) => {
                        return from + '-' + to + ' de ' + count
                    }
                }
                labelRowsPerPage={'Filas por página:'}
            />
        </Card>
    );
};
