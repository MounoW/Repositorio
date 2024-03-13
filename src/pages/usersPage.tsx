import { useEffect, useState } from 'react';

import { Card } from '../components/card/card';

interface UserInfo {
    id: number;
    name: string;
    username: string;
    email: string;
}
export const UserPage = () => {
    const [users, setUsers] = useState<UserInfo[]>([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(json => setUsers(json));
    }, []);

    return (
        <div className="container ">
            <div className="row justify-content-center">
                {users.map(user => {
                    return <Card key={user.id} name={user.name} email={user.email} id={user.id} />;
                })}
            </div>
        </div>
    );
};
