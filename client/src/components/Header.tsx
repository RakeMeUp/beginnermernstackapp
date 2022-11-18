import "./Header.css";
type Props = {};

const Header = (props: Props) => {
    return (
        <header>
            <h1>Decks & Cards</h1>
            <a href="/">
                <button>Home</button>
            </a>
        </header>
    );
};

export default Header;
