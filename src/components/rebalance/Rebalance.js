import React, {useState, useEffect} from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './../../components/listItems';
import api from './../../services/api'
import Alert from '@material-ui/lab/Alert';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import LineTable from './LineTable';
import TableContainer from '@material-ui/core/TableContainer'; 

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 75,
  },
  tableCell: {
    "$hover:hover &": {
      color: "pink"
    }
  },
}));
export default function Rebalance() {
  
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [tipo, setTipoAlert, ] = React.useState('error');
  const [messageAlert, setMessageAlert, ] = React.useState('Default');
  const [showAlert, setShowAlert] = React.useState(false);
  const [rebalance, setList] = useState([]);
  

  function calculateTotalNote() {
    return rebalance.reduce((total, rb) => total + rb.note, 0);
  }

  function calculateTotalApplied() {
    return rebalance.reduce((total, rb) => total + rb.investiment.appliedAmount, 0);
  }

  useEffect(()=>{
    getAllInvestiments();
  },[]) 

  async function getAllInvestiments() {
    await api.get("/rebalance/list")
    .then( (rebalance) => {
      setList(rebalance.data);
    });
  }

  function saveRebalance(reb) {

    console.log(reb);
    //const fd = new FormData();
    //fd.append('rebalance', reb);

    api.post("/rebalance/update",reb).then(res => {
      setTipoAlert('success');
      setMessageAlert('Rebalanceamento da carteira salvo com sucesso!')
      setShowAlert(true);
     },
     error => {
        setTipoAlert('error');
        setMessageAlert('Error ao atualizar o rebalanceamento da carteira: ' + error);
        setShowAlert(true);
       })
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Rebalancear Carteira
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <div
          style={{display: showAlert ? 'block': 'none'}}
          className="container"
        >
          <Alert severity={tipo}>{messageAlert}</Alert>
        </div>
          <Grid container spacing={3}>
          <Grid item xs={12}>
            <TableContainer component={Paper}> 
                  <Table size="medium">
                    <TableHead>
                      <TableRow>
                        <TableCell>Ação</TableCell>
                        <TableCell>Qtd</TableCell>
                        <TableCell>Cotação</TableCell>
                        <TableCell>Nota</TableCell>
                        <TableCell>Valor Ideal</TableCell>
                        <TableCell>Porcentagem ideal</TableCell>
                        <TableCell>Qtd ideal</TableCell>
                        <TableCell>Valor Ajustado</TableCell>
                        <TableCell>Percentagem Ajustado</TableCell>
                        <TableCell>Qtd Ajustado</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>-</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        rebalance.map((reb, i) => <LineTable saveRebalance={saveRebalance} rebalance={reb} key={i} totalNote={calculateTotalNote()} totalApllied={calculateTotalApplied()} />)
                      }
                    </TableBody>
                  </Table>
                </TableContainer>  
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
      </main>
    </div>
  );
}