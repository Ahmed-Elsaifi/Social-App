'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { state } from '../_redux/store';
import { useRouter } from 'next/navigation';
import { removeToken } from '../_redux/auhtSlice';

function Navbar() {



  const token = useSelector((store:state)=>store.authReducer.token)
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const router =useRouter()
 const dispatch=useDispatch()
  function logout (){
    handleCloseNavMenu()

     router.push('/login')
     dispatch(removeToken())


    
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
          <Typography
            variant="h6"
            noWrap
            
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {token?<Link href={'/'} >Social</Link>:'Social'}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
             
               {token&& <Box>
               <MenuItem  onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>
                    <Link href={'/profile'} >Profile</Link>
                  </Typography>
                </MenuItem>
                
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>
                    <Link href={'/createPost'} >Add Post</Link>
                  </Typography>
                </MenuItem>
                </Box>
                }
                
            </Menu>
          </Box>
          
          <Typography
            variant="h5"
            noWrap
            
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {token?<Link href={'/'} >Social</Link>:'Social'}
          </Typography>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {token&&<Box sx={{display: { xs: 'none', md: 'flex' }}} >
            
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link href={'/profile'} >Profile</Link>
                
              </Button>
              
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link href={'/createPost'} >Add Post</Link>
                
              </Button>
              </Box>}
             
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            {token?
              <Button
                onClick={logout}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Logout
                
              </Button>:<Box sx={{display: { xs: 'none', md: 'flex' } }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link href={'/login'} >Login</Link>
                
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link href={'/register'} >Register</Link>
                
              </Button>
              </Box>
          }
            
          
          </Box>
          <Box sx={{ flexGrow: 0 ,display:{xs:'flex',md:'none'}}}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
               {token?<MenuItem  onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>
                     Logout
                  </Typography>
                </MenuItem>:
                <Box><MenuItem  onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>
                    <Link href={'/login'} >Login</Link>
                  </Typography>
                </MenuItem>
                <MenuItem  onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>
                    <Link href={'/register'} >Register</Link>
                  </Typography>
                </MenuItem>


               </Box>}
                
                
             
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
