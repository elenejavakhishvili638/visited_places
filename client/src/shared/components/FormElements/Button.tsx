import React from 'react'
import { Link } from 'react-router-dom';
import "./Button.css"

type Props = {
    href?: string,
    size?: string,
    inverse?: boolean,
    danger?: boolean,
    children: React.ReactNode,
    type?: "button" | "submit" | "reset",
    onClick?: () => void,
    disabled?: boolean,
    to?: string,
    exact?: string
}

function Button({ to, href, size, inverse, danger, children, type, onClick, disabled }: Props) {
    if (href) {
        return (
            <a
                className={`button button--${size || 'default'} ${inverse &&
                    'button--inverse'} ${danger && 'button--danger'}`}
                href={href}
            >
                {children}
            </a>
        );
    }
    if (to) {
        return (
            <Link
                to={to}
                // exact={exact}
                className={`button button--${size || 'default'} ${inverse &&
                    'button--inverse'} ${danger && 'button--danger'}`}
            >
                {children}
            </Link>
        );
    }
    return (
        <button
            className={`button button--${size || 'default'} ${inverse &&
                'button--inverse'} ${danger && 'button--danger'}`}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default Button