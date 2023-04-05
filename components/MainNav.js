import { Container, Nav, Navbar } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import { set } from 'react-hook-form';
import { addToHistory } from '@/lib/userData';
import { readToken, removeToken } from '@/lib/authenticate';

export default function MainNav() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [search, setSearch] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  let token = readToken();

  async function handleSubmit(e) {
    e.preventDefault();
    setIsExpanded(false);
    setSearchHistory(await addToHistory(`title=true&q=${search}`));
    setSearch('');
    router.push(`/artwork?title=true&q=${search}`);
  }

  function logout() {
    setIsExpanded(false);
    removeToken();
    router.push('/login');
  }

  return (
    <>
      <Navbar
        bg="light"
        className="fixed-top"
        expand="lg"
        expanded={isExpanded}
      >
        <Container>
          <Navbar.Brand>Rahul Bajaj</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setIsExpanded(!isExpanded)}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link
                  active={router.pathname === '/'}
                  onClick={() => setIsExpanded(false)}
                >
                  Home
                </Nav.Link>
              </Link>
              {token && (
                <Link href="/search" passHref legacyBehavior>
                  <Nav.Link
                    active={router.pathname === '/search'}
                    onClick={() => setIsExpanded(false)}
                  >
                    Advanced
                  </Nav.Link>
                </Link>
              )}
            </Nav>
            &nbsp;
            {!token && (
              <Nav>
                <Link href="/register" passHref legacyBehavior>
                  <Nav.Link
                    active={router.pathname === '/register'}
                    onClick={() => setIsExpanded(false)}
                  >
                    Register
                  </Nav.Link>
                </Link>
                {
                  <Link href="/login" passHref legacyBehavior>
                    <Nav.Link
                      active={router.pathname === '/login'}
                      onClick={() => setIsExpanded(false)}
                    >
                      Login
                    </Nav.Link>
                  </Link>
                }
              </Nav>
            )}
            {token && (
              <Form className="d-flex" onSubmit={handleSubmit}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  value={search}
                />
                <Button
                  type="submit"
                  variant="outline-success"
                  onClick={() => {
                    setIsExpanded(false);
                  }}
                >
                  Search
                </Button>
              </Form>
            )}
            &nbsp;
            {token && (
              <Nav>
                <NavDropdown title={token.userName} id="basic-nav-dropdown">
                  <Link href="/favourites" passHref legacyBehavior>
                    <NavDropdown.Item
                      active={router.pathname === '/favourites'}
                      href="/favourites"
                      onClick={() => {
                        setIsExpanded(false);
                      }}
                    >
                      Favourites
                    </NavDropdown.Item>
                  </Link>
                  <Link href="/history" passHref legacyBehavior>
                    <NavDropdown.Item
                      active={router.pathname === '/history'}
                      href="/history"
                      onClick={() => {
                        setIsExpanded(false);
                      }}
                    >
                      Search History
                    </NavDropdown.Item>
                  </Link>
                  <NavDropdown.Item
                    onClick={() => {
                      logout();
                    }}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
