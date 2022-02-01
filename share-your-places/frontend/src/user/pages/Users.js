import React, { useEffect, useState } from 'react'
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import UsersList from '../components/UsersList'

function Users() {

    const [users, setUsers] = useState();

    const { isLoading, error, sendRequest, clearError } = useHttpClient()


    useEffect(() => {                          // we used async in a new function'fetchUsers' because it is not prefered to use it in use effect'
        const fetchUsers = async () => {
            try {
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/users');
                setUsers(responseData.users);
            } catch (err) {
            }

        };
        fetchUsers();
    }, [sendRequest]);

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && users && <UsersList users={users} />};
        </React.Fragment>
    )
}

export default Users
