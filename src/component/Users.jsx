
import UsersList from "./UsersList";
import { Row } from "antd";
import LoadingIndigator from "./LoadingIndigator";
import ModalForm from "./ModalForm";
import useFetchUsers from "../hook/useFetchUsers";
import { fetchUsers } from "../http";
import { useSelector } from "react-redux"



export default function Users() {

    const isModalOpen = useSelector((state) => state.modal.isModalOpen);
    const isReFetching = useSelector((state) => state.reFetch.isReFetching);

    const { usersData: users, isLoading, error } = useFetchUsers(fetchUsers, [], isReFetching);

    return (
        <div className="user">
            {isLoading && <LoadingIndigator />}
            {error && <p>{error.message}</p>}
            {isModalOpen && <ModalForm />}
            <Row gutter={[16, 24]}>
                {!isLoading && !error && users.map(user => {
                    return (
                        <UsersList key={user._id} user={user} />
                    )
                })}
            </Row>
        </div>
    )
}
