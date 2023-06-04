import { Tooltip as TooltipBase, TooltipProps } from 'antd';

import { useTheme } from 'src/client/shared/hooks/use-theme';

export const Tooltip = ({ ...rest }: TooltipProps) => {
    const { isLight } = useTheme();

    return <TooltipBase color={isLight ? '#59c2e7' : '#5f85db'} {...rest} destroyTooltipOnHide/>;
};
