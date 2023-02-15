import { Link } from "react-router-dom";

export function MenuItem({ children, href }) {
  return (
    <li>
      <Link
        to={href}
        className={
          "flex items-center text-base font-normal text-gray-900 " +
          "rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 " +
          "dark:text-white group"
        }
      >
        <span className="ml-3">{children}</span>
      </Link>
    </li>
  );
}
