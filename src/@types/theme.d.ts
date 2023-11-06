import { Theme } from '@material-ui/core/styles/createTheme';

declare module '@material-ui/styles' {
  interface DefaultTheme extends MyTheme {}
}

declare module '@material-ui/core/styles/createTheme' {
  interface ThemeOptions extends MyTheme {}
}

export interface MyTheme extends Theme {}
