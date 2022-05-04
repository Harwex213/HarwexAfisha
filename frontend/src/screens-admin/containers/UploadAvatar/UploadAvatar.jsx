import React, { useState } from "react";
import { notification, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

const UploadAvatar = ({ fileList, setFileList, imageUrl, setImageUrl }) => {
    const [loading, setLoading] = useState(false);

    const beforeUpload = async (file) => {
        const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
            notification["error"]({
                message: "Cannot upload",
                description: "You can only upload JPG/PNG file!",
            });
            return false;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            notification["error"]({
                message: "Cannot upload",
                description: "Image must smaller than 2MB!",
            });
            return false;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        setLoading(true);
        reader.onload = (e) => {
            setLoading(false);
            file.thumbUrl = e.target.result;
            setFileList([file]);
            setImageUrl(e.target.result);
        };
        return false;
    };

    return (
        <Upload
            listType="picture-card"
            showUploadList={false}
            beforeUpload={beforeUpload}
            fileList={fileList}
        >
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt="avatar"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
            ) : loading ? (
                <LoadingOutlined />
            ) : (
                <PlusOutlined />
            )}
        </Upload>
    );
};

export default UploadAvatar;
