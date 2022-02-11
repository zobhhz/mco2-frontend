import styles from "./NavItem.module.scss";
import Link from "next/link";

const NavItem = ({ active, name, link }) => {
    return (
        <li className="inline-block ml-5 relative">
            <Link href={link}>
                <a id={`nav${name}`}>{name}</a>
            </Link>
        </li>
    );
};

export default NavItem;