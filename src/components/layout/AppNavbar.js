import {useRef, useState} from 'react';
import styled from '@emotion/styled';
import {AppBar, Avatar, Box, IconButton, Toolbar} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {UserCircle as UserCircleIcon} from '../../icons/UserCircle';
import {AccountPopover} from './AccountPopover';

const AppNavbarRoot = styled(AppBar)(({theme}) => ({
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3]
}));

export const AppNavbar = (props) => {
    const {onSidebarOpen, ...other} = props;
    const settingsRef = useRef(null);
    const [openAccountPopover, setOpenAccountPopover] = useState(false);

    return (
        <>
            <AppNavbarRoot
                sx={{
                    left: {
                        lg: 280
                    },
                    width: {
                        lg: 'calc(100% - 280px)'
                    }
                }}
                {...other}>
                <Toolbar
                    disableGutters
                    sx={{
                        minHeight: 64,
                        left: 0,
                        px: 2
                    }}
                >
                    <IconButton
                        onClick={onSidebarOpen}
                        sx={{
                            display: {
                                xs: 'inline-flex',
                                lg: 'none'
                            },
                        }}
                    >
                        <MenuIcon fontSize="small"/>
                    </IconButton>
                    <Box sx={{flexGrow: 1}}/>
                    <Avatar
                        onClick={() => setOpenAccountPopover(true)}
                        ref={settingsRef}
                        sx={{
                            cursor: 'pointer',
                            height: 40,
                            width: 40,
                            ml: 1
                        }}
                        src="/static/images/avatars/avatar_1.png"
                    >
                        <UserCircleIcon fontSize="small"/>
                    </Avatar>
                </Toolbar>
            </AppNavbarRoot>
            <AccountPopover
                anchorEl={settingsRef.current}
                open={openAccountPopover}
                onClose={() => setOpenAccountPopover(false)}
            />
        </>
    );
};
