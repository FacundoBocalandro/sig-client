import {useState} from 'react';
import {Box} from '@mui/material';
import {styled} from '@mui/material/styles';
import {AppNavbar} from "./AppNavbar";
import {AppSidebar} from "./AppSidebar";
import {withAuthentication} from "../../providers/AuthenticationProvider";

const AppLayoutRoot = styled('div')(({theme}) => ({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
        paddingLeft: 280
    }
}));

export const AppLayout = withAuthentication((props) => {
    const {children} = props;
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    return (
        <>
            <AppLayoutRoot>
                <Box
                    sx={{
                        display: 'flex',
                        flex: '1 1 auto',
                        flexDirection: 'column',
                        width: '100%'
                    }}
                >
                    {children}
                </Box>
            </AppLayoutRoot>
            <AppNavbar onSidebarOpen={() => setSidebarOpen(true)}/>
            <AppSidebar
                onClose={() => setSidebarOpen(false)}
                open={isSidebarOpen}
            />
        </>
    );
})
