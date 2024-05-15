// import React from 'react';

import './dropdown.scss';

interface DropDownProps {
    setSelectedDepartment: (id: string) => void;
}

export const DropDown = ({ setSelectedDepartment }: DropDownProps) => {
    function handleCenas(event: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedDepartment(String(event.target.value));
    }

    return (
        <select className="select" aria-label="Default select example" onChange={handleCenas}>
            <option selected>Todos</option>
            <option value="1">Departamento A</option>
            <option value="2">Departamento B</option>
            <option value="3">Departamento C</option>
        </select>
    );
};
