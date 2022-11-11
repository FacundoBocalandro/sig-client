import { styled } from '@mui/material/styles';

const SeverityPillRoot = styled('span')(({ theme, average }) => {
    const backgroundColor = theme.palette[average.color].main;
    const color = theme.palette[average.color].contrastText;

    return {
        alignItems: 'center',
        backgroundColor,
        borderRadius: 12,
        color,
        cursor: 'default',
        display: 'inline-flex',
        flexGrow: 0,
        flexShrink: 0,
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.typography.pxToRem(12),
        lineHeight: 2,
        fontWeight: 600,
        justifyContent: 'center',
        letterSpacing: 0.5,
        minWidth: 20,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        textTransform: 'uppercase',
        whiteSpace: 'nowrap'
    };
});

export const AveragePill = (props) => {
    const { color = 'primary', children, ...other } = props;

    const average = { color };

    return (
        <SeverityPillRoot
            average={average}
            {...other}
        >
            {children}
        </SeverityPillRoot>
    );
};
