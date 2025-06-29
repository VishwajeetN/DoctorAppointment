import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const Header = ({ name, onLogout }) => {
<>
            <Container>
                <div className="container mt-3">
                    <div className="d-flex justify-content-end align-items-center">
                        <span className="me-3"><strong>{name}</strong></span>
                        <button className="btn btn-outline-danger" onClick={onLogout}>Logout</button>
                    </div>
                </div>
            </Container>
</>
}

export default Header