import { createMuiTheme } from 'material-ui/styles';
import { red, pink, orange } from 'material-ui/colors';

/*helper

primaryColor #E91E63

darkPrimaryColor #C2185B

lightPrimaryColor #F8BBD0

secondaryColor #FF9800

white #FFFFFF

black #212121

darkGrey #757575

grey #BDBDBD

*/

class theme {
  switchStyle = (type) =>{
    let choice = "";
    switch(type){
      case 'primaryColor':
        choice = this.renderTheme.palette.primary[500];
      break;
      case 'darkPrimaryColor':
        choice = this.renderTheme.palette.primary[700];
      break;
      case 'lightPrimaryColor':
        choice = this.renderTheme.palette.primary[100];
      break;
      case 'secondaryColor':
        choice = this.renderTheme.palette.secondary[500];
      break;
      case 'white':
        choice = '#FFFFFF';
      break;
      case 'black':
        choice = '#212121';
      break;
      case 'darkGrey':
        choice = '#757575';
      break;
      case 'grey':
        choice = '#BDBDBD';
      break;
      case 'none':
        choice = '';
      break;
      default:
        choice = 'inherit';
      break;
    }
    return choice;
  }
  getRowStyle = (color, bgColor) => {
    return {
      color: this.switchStyle(color),
      backgroundColor: this.switchStyle(bgColor)
    }
  }
  renderTheme = createMuiTheme({
    palette: {
      primary: {
        ...pink,
      },
      secondary: {
        ...orange,
      },
    },
    status: {
      danger: red[500],
    },
  });
}

export default theme;
