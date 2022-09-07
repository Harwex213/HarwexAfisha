import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/userSlice";
import "./account.css";
import capitalizeFirstLetter from "../../../helpers/capitalizeFirstLetter";
import { Button, Col, Divider, Modal, notification, Row } from "antd";
import { setNoneRoute } from "../../../store/slices/afishaSlice";
import ChangePasswordForm from "./ChangePasswordForm";
import ChangeUserInfoForm from "./ChangeUserInfoForm";

const Account = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    useEffect(() => {
        dispatch(setNoneRoute());
    });

    const handleClick = () => {
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleOk = () => {
        setIsModalVisible(false);

        notification["success"]({
            message: "Successfully changed",
            placement: "topLeft",
        });
    };

    return (
        <div className="account">
            <h1 className="account__header">User information</h1>
            <Row gutter={[32, 24]} type="flex">
                <Col className="account__area" key={0} xl={8}>
                    <Divider style={{ marginBottom: "11px" }} />
                    <div className="account__userInfo">
                        <div className="account__userInfoRow">
                            <p>Id</p>
                            <p>{user.id}</p>
                        </div>
                        <div className="account__userInfoRow">
                            <p>Username</p>
                            <p>{user.username}</p>
                        </div>
                        <div className="account__userInfoRow">
                            <p>Email</p>
                            <p>{user.email || ""}</p>
                        </div>
                        <div className="account__userInfoRow">
                            <p>Full name</p>
                            <p>
                                {capitalizeFirstLetter(user.firstName)} {capitalizeFirstLetter(user.lastName)}{" "}
                                {capitalizeFirstLetter(user.patronymic || "")}
                            </p>
                        </div>
                    </div>
                    <Divider style={{ marginTop: "auto" }} />
                    <Button onClick={handleClick} className="account__button">
                        Change
                    </Button>
                </Col>
                <Col key={1} xl={8}>
                    <ChangePasswordForm />
                </Col>
            </Row>
            <Modal
                title="Change user's information"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                destroyOnClose
            >
                <ChangeUserInfoForm onSubmit={handleOk} />
            </Modal>
        </div>
    );
};

export default Account;
