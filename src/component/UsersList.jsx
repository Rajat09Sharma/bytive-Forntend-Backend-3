
import { Col, Card } from "antd";
const { Meta } = Card;
import { EditOutlined, DeleteFilled, HeartOutlined, GlobalOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { useDispatch } from "react-redux";
import { idActions, modalActions } from "../store";
import { deleteUser } from "../http";
import { reFetchActions } from "../store";


export default function UsersList({ user}) {

    const dispatch = useDispatch();
    function handleEditClick(id) {
        dispatch(idActions.setId({ id: id }));
        dispatch(modalActions.showModal());
    }

    async function handleDelete(id) {
        const result = await deleteUser(id);
        if (result) {
            console.log(result);
            dispatch(reFetchActions.handleReFetch());
        }
    }


    let info = <div className="info">
        <p><MailOutlined key="mail" className="icon" />{user.email}</p>
        <p><PhoneOutlined key="phone" className="icon" />{user.phone}</p>
        <p><GlobalOutlined key="link" className="icon" />{user.website}</p>

    </div>

    let imgSrc = `https://api.dicebear.com/9.x/micah/svg?seed=${user.username}&backgroundColor=fafafa`;


    return (
        <Col xs={24} sm={24} md={6} lg={6}>
            <Card
                style={{
                    width: "100%",
                }}

                cover={
                    <img src={imgSrc} alt="avatar" />
                }

                actions={[
                    <HeartOutlined key="favorite" style={{ fontSize: "1.4rem", color: "red" }} />,
                    <EditOutlined key="edit" style={{ fontSize: "1.4rem" }} onClick={() => handleEditClick(user._id)} />,
                    <DeleteFilled key="delete" style={{ fontSize: "1.4rem" }} onClick={() => handleDelete(user._id)} />,

                ]}
            >
                <Meta
                    title={user.name}
                    description={info}
                />
            </Card>

        </Col>

    )
}
