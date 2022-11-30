import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon, Typography, Grid, Chip
} from '@mui/material';
import {Search as SearchIcon} from '../../icons/Search';

const filters = [
    {
        label: 'Cachorras',
        id: 'CUB'
    },
    {
        label: 'En ciclo',
        id: 'IN_CYCLE'
    },
    {
        label: 'Preñadas',
        id: 'PREGNANT'
    },
    {
        label: 'Paridas',
        id: 'IN_BIRTH'
    },
    {
        label: 'Parto reciente',
        id: 'RECENT_BIRTH'
    },
    {
        label: 'Descartadas',
        id: 'DISCARDED'
    },
]

export const PigListToolbar = ({handleOpen, handleSearch, searchText, handleFilter, activeStatusFilters, ...props}) => (
    <Box {...props}>
        <Box
            sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                m: -1
            }}
        >
            <Typography
                sx={{m: 1}}
                variant="h4"
            >
                Cerdas
            </Typography>
            <Box sx={{m: 1}}>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={handleOpen}
                >
                    Agregar cerda
                </Button>
            </Box>
        </Box>
        <Box sx={{mt: 3}}>
            <Card>
                <CardContent>
                    <Grid container>
                        <Grid item xs={12} md={5}>
                            <Box sx={{width: '100%'}}>
                                <TextField
                                    fullWidth
                                    value={searchText}
                                    onChange={e => handleSearch(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SvgIcon
                                                    color="action"
                                                    fontSize="small"
                                                >
                                                    <SearchIcon/>
                                                </SvgIcon>
                                            </InputAdornment>
                                        )
                                    }}
                                    placeholder="Buscar cerda"
                                    variant="outlined"
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={7} sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                            {
                                filters.map(({label, id}) => (
                                    <Chip sx={{marginRight: '5px'}} label={label} key={id} clickable color={'primary'} variant={activeStatusFilters.includes(id) ? 'contained' : 'outlined'} onClick={() => handleFilter(id)}/>
                                ))
                            }
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    </Box>
);
