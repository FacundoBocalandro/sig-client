import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography
} from '@mui/material';
import {format} from "date-fns";

const PigBasicDetails = ({basicInformation, addCycle, lastBirth, ...props}) => (
    <Card {...props}>
        <CardContent>
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h5"
                >
                    {basicInformation.pigId}
                </Typography>
                <Typography
                    color="textSecondary"
                    variant="body2"
                >
                    Genéticas: {basicInformation.genetics}
                </Typography>
                <Typography
                    color="textSecondary"
                    variant="body2"
                >
                    Edad: {basicInformation.age}
                </Typography>
                <Typography
                    color="textSecondary"
                    variant="body2"
                >
                    Fecha de ingreso: {format(new Date(basicInformation.created_at), 'dd/MM/yyyy')}
                </Typography>
                <Typography
                    color="textSecondary"
                    variant="body2"
                >
                    Padre: {!!basicInformation.fatherId ? basicInformation.fatherId : '-'}
                </Typography>
                <Typography
                    color="textSecondary"
                    variant="body2"
                >
                    Madre: {!!basicInformation.motherId ? basicInformation.motherId : '-'}
                </Typography>
                <Typography
                    color="textSecondary"
                    variant="body2"
                >
                    Último parto: {lastBirth ? format(new Date(lastBirth), 'dd/MM/yyyy') : '-'}
                </Typography>
                <Typography
                    color="textSecondary"
                    variant="body2"
                >
                    Nac./año: {basicInformation.bornPerYear}
                </Typography>
                <Typography
                    color="textSecondary"
                    variant="body2"
                >
                    Dest./año: {basicInformation.weanedPerYear}
                </Typography>
            </Box>
        </CardContent>
        <Divider />
        <CardActions>
            <Button
                color="primary"
                fullWidth
                variant="text"
                onClick={addCycle}
            >
                Agregar ciclo
            </Button>
        </CardActions>
    </Card>
);

export default PigBasicDetails
