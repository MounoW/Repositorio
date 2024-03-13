import { useParams } from 'react-router-dom';

export const UserDetailPage = () => {
    const { userid, email } = useParams();

    return (
        <div>
            UserId={userid} Email={email}
        </div>
    );
};
