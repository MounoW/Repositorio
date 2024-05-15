// import React from 'react';

import './dropdown.scss';

interface DropDownProps {
    setSelectedDepartment: (id: string) => void;
}

export const DropDown = ({ setSelectedDepartment }: DropDownProps) => {
    const handleDepartmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDepartment(event.target.value);
    };

    return (
        <select className="select" aria-label="Selecione um departamento" onChange={handleDepartmentChange}>
            <option value="Todos">Todos</option>
            <option value="1">Departamento Design</option>
            <option value="2">Departamento Software</option>
            <option value="3">Departamento RH</option>
        </select>
    );
};
