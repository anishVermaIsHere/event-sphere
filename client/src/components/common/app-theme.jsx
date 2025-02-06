import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { inputsCustomizations } from './inputs';
import { dataDisplayCustomizations } from './data-display';
import { navigationCustomizations } from './navigation';
import { surfacesCustomizations } from './surfaces';
import { colorSchemes, typography, shadows, shape } from '../dashboard/theme/theme-primitives';
import { chartsCustomizations, dataGridCustomizations, datePickersCustomizations, treeViewCustomizations } from "../dashboard/theme/customizations";


const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

function AppTheme(props) {
  const { children, disableCustomTheme } = props;
  const theme = useMemo(() => {
    return disableCustomTheme
      ? {}
      : createTheme({
          // For more details about CSS variables configuration, see https://mui.com/material-ui/customization/css-theme-variables/configuration/
          // cssVariables: {
          //   colorSchemeSelector: 'data-mui-color-scheme',
          //   cssVarPrefix: 'template',
          // },
          colorSchemes, // Recently added in v6 for building light & dark mode app, see https://mui.com/material-ui/customization/palette/#color-schemes
          shadows,
          shape,
          typography: {
            ...typography,
            // button: {
            //   textTransform: 'none'
            // }
          },
          components: {
            ...inputsCustomizations,
            ...dataDisplayCustomizations,
            ...navigationCustomizations,
            ...surfacesCustomizations,
            ...xThemeComponents,
          },
        });
  }, [disableCustomTheme]);
  if (disableCustomTheme) {
    return <>{children}</>;
  }
  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}

AppTheme.propTypes = {
  children: PropTypes.node,
  disableCustomTheme: PropTypes.bool,
};

export default AppTheme;
