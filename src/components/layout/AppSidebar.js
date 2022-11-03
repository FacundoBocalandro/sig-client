import { Box, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import { ChartBar as ChartBarIcon } from '../../icons/ChartBar';
import { List as ListIcon } from '../../icons/List';
import { Logo } from '../Logo';
import { NavItem } from './NavItem';
import {Link} from "react-router-dom";
import {useAuthentication} from "../../providers/AuthenticationProvider";

const items = [
    {
        href: '/dashboard',
        icon: (<ChartBarIcon fontSize="small" />),
        title: 'Dashboard'
    },
    {
        href: '/cerdas',
        icon: (<ListIcon fontSize="small" />),
        title: 'Cerdas'
    },
];

export const AppSidebar = (props) => {
    const {user} = useAuthentication();
    const { open, onClose } = props;
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
        defaultMatches: true,
        noSsr: false
    });

    const content = (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                }}
            >
                <div>
                    <Box sx={{ p: 3 }}>
                            <Link to={'/dashboard'}>
                                <Logo
                                    sx={{
                                        height: 42,
                                        width: 42
                                    }}
                                />
                            </Link>
                    </Box>
                    <Box sx={{ px: 2 }}>
                        <Box
                            sx={{
                                alignItems: 'center',
                                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'space-between',
                                px: 3,
                                py: '11px',
                                borderRadius: 1
                            }}
                        >
                            <div>
                                <Typography
                                    color="inherit"
                                    variant="subtitle1"
                                >
                                    {user ? user.displayName : '...'}
                                </Typography>
                                <Typography
                                    color="neutral.400"
                                    variant="body2"
                                >
                                    Su plan: Premium
                                </Typography>
                            </div>
                        </Box>
                    </Box>
                </div>
                <Divider
                    sx={{
                        borderColor: '#2D3748',
                        my: 3
                    }}
                />
                <Box sx={{ flexGrow: 1 }}>
                    {items.map((item) => (
                        <NavItem
                            key={item.title}
                            icon={item.icon}
                            href={item.href}
                            title={item.title}
                        />
                    ))}
                </Box>
                <Divider sx={{ borderColor: '#2D3748' }} />
            </Box>
        </>
    );

    if (lgUp) {
        return (
            <Drawer
                anchor="left"
                open
                PaperProps={{
                    sx: {
                        backgroundColor: 'neutral.900',
                        color: '#FFFFFF',
                        width: 280
                    }
                }}
                variant="permanent"
            >
                {content}
            </Drawer>
        );
    }

    return (
        <Drawer
            anchor="left"
            onClose={onClose}
            open={open}
            PaperProps={{
                sx: {
                    backgroundColor: 'neutral.900',
                    color: '#FFFFFF',
                    width: 280
                }
            }}
            sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
            variant="temporary"
        >
            {content}
        </Drawer>
    );
};
