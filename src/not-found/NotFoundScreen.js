import {Box, Button, Container, Link, Typography} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const NotFoundScreen = () => (
        <Box
            component="main"
            sx={{
                alignItems: 'center',
                display: 'flex',
                flexGrow: 1,
                minHeight: '100%'
            }}
        >
            <Container maxWidth="md">
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Typography
                        align="center"
                        color="textPrimary"
                        variant="h1"
                    >
                        La página que está buscando no existe
                    </Typography>
                    <Box sx={{ textAlign: 'center' }}>
                        <img
                            alt="Under development"
                            src="/static/images/undraw_page_not_found_su7k.svg"
                            style={{
                                marginTop: 50,
                                display: 'inline-block',
                                maxWidth: '100%',
                                width: 560
                            }}
                        />
                    </Box>
                    <Link
                        href="/"
                        underline={"none"}
                    >
                        <Button
                            component="a"
                            startIcon={(<ArrowBackIcon fontSize="small" />)}
                            sx={{ mt: 3 }}
                            variant="contained"
                        >
                            Volver al sitio
                        </Button>
                    </Link>
                </Box>
            </Container>
        </Box>
);

export default NotFoundScreen;
