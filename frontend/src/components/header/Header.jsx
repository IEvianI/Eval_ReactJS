import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem } from '@nextui-org/react'
import { AcmeLogo } from './AcmeLogo.jsx'
import { useState } from 'react'
import { useAuth } from '../../contexts/authContext.jsx'
import { FaShoppingCart } from 'react-icons/fa'

function Header () {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { state: { isLoggedIn, user }, logout } = useAuth()

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='sm:hidden'
        />
        <NavbarBrand>
          <AcmeLogo />
          <p className='font-bold text-inherit'>ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarItem>
          <Link href='/'>
            Accueil
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='/artisans'>
            Artisans
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='/about'>
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='/services'>
            Services
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='/contact'>
            Contact
          </Link>
        </NavbarItem>
      </NavbarContent>
      {
        isLoggedIn
          ? (
            <NavbarContent as='div' justify='end'>
              <Dropdown placement='bottom-end'>
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as='button'
                    className='transition-transform'
                    color='primary'
                    name={user.username}
                    size='sm'
                    src={user.avatarUrl ? `http://localhost:1337${user.avatarUrl}` : 'default-avatar-url'}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label='Profile Actions' variant='flat'>
                  <DropdownItem key='profile' className='h-14 gap-2'>
                    <p className='font-semibold'>Connecté en tant que</p>
                    <p className='font-semibold'>{user.email}</p>
                  </DropdownItem>
                  <DropdownItem href='/profile'>
                    Mon profil
                  </DropdownItem>
                  <DropdownItem key='logout' color='danger' onPress={logout}>
                    Déconnexion
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <NavbarItem>
                <Link href='/Panier'>
                  <FaShoppingCart className='w-6 h-6' />
                </Link>
              </NavbarItem>
            </NavbarContent>
            )
          : (
            <NavbarContent justify='end'>
              <NavbarItem className='hidden lg:flex'>
                <Link href='register'>Inscription</Link>
              </NavbarItem>
              <NavbarItem>
                <Button as={Link} color='primary' href='/authentication' variant='flat'>
                  Se connecter
                </Button>
              </NavbarItem>
            </NavbarContent>
            )
      }

      <NavbarMenu>
        <NavbarMenuItem>
          <Link Link href='/'>
            Accueil
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link Link href='/services'>
            Services
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link Link href='/about'>
            About
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link Link href='/artisans'>
            Artisans
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link Link href='/contact'>
            Contact
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  )
}

export default Header
