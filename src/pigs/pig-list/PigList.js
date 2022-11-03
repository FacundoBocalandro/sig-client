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

export const PigList = ({ pigs, ...rest }) => {
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
                                    Padre
                                </TableCell>
                                <TableCell width={'20%'}>
                                    Genéticas
                                </TableCell>
                                <TableCell width={'20%'}>
                                    Fecha de ingreso
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pigs.slice(limit*page, limit*page + limit).map((pig) => (
                                <TableRow
                                    hover
                                    key={pig.id}
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
                                        {pig.fatherId}
                                    </TableCell>
                                    <TableCell>
                                        {pig.genetics}
                                    </TableCell>
                                    <TableCell>
                                        {format(new Date(pig.created_at), 'dd/MM/yyyy')}
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
