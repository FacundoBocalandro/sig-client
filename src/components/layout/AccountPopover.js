import { Box, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import {useAuthentication} from "../../providers/AuthenticationProvider";
import {useNavigate} from "react-router-dom";

export const AccountPopover = (props) => {
    const { anchorEl, onClose, open, ...other } = props;
    const {logout, user} = useAuthentication();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        onClose?.();
        logout(() => navigate('/'))
    };

    return (
        <Popover
            anchorEl={anchorEl}
            anchorOrigin={{
                horizontal: 'left',
                vertical: 'bottom'
            }}
            onClose={onClose}
            open={open}
            PaperProps={{
                sx: { width: '300px' }
            }}
            {...other}
        >
            <Box
                sx={{
                    py: 1.5,
                    px: 2
                }}
            >
                <Typography variant="overline">
                    Cuenta
                </Typography>
                <Typography
                    color="text.secondary"
                    variant="body2"
                >
                    {user ? user.displayName : '...'}
                </Typography>
            </Box>
            <MenuList
                disablePadding
                sx={{
                    '& > *': {
                        '&:first-of-type': {
                            borderTopColor: 'divider',
                            borderTopStyle: 'solid',
                            borderTopWidth: '1px'
                        },
                        padding: '12px 16px'
                    }
                }}
            >
                <MenuItem onClick={handleSignOut}>
                    Salir
                </MenuItem>
            </MenuList>
        </Popover>
    );
};
