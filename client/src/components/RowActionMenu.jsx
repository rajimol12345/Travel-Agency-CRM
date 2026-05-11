import React, { useEffect, useRef, useState } from 'react';
import { MoreVertical } from 'lucide-react';
import './RowActionMenu.css';

const RowActionMenu = ({ actions }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    const handleActionClick = (action) => {
        action.onClick();
        setIsOpen(false);
    };

    return (
        <div className="row-action-menu" ref={menuRef}>
            <button
                className="row-action-trigger"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label="Open row actions"
            >
                <MoreVertical size={16} />
            </button>

            {isOpen && (
                <div className="row-action-dropdown">
                    {actions.map((action) => (
                        <button
                            key={action.label}
                            className={`row-action-item ${action.danger ? 'danger' : ''}`}
                            onClick={() => handleActionClick(action)}
                        >
                            {action.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RowActionMenu;
