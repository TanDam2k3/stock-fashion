import React, { useState } from "react";
import axios from "axios";

type Course = {
    _id: string;
    name: string;
    videoId: string;
    level: string;
    image?: string;
    description?: string;
};

interface PopupEditProps {
    course: Course;
    onClose: () => void;
    setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
}

const PopupEdit: React.FC<PopupEditProps> = ({ course, onClose, setCourses }) => {
    const [editedCourse, setEditedCourse] = useState<Course>(course);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);  // Thêm state để lưu thông báo thành công

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedCourse({ ...editedCourse, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);  // Reset thông báo thành công mỗi khi bắt đầu gửi yêu cầu

        try {
            const response = await axios.put(`http://localhost:3001/courses/${editedCourse._id}`, editedCourse);
            console.log('Response:', response);  // Log phản hồi từ server

            if (response.status === 200) {
                // Nếu phản hồi là thành công, cập nhật lại danh sách khóa học
                setCourses(prevCourses =>
                    prevCourses.map(c => (c._id === editedCourse._id ? response.data.course : c))
                );

                setSuccess("Cập nhật thành công!");  // Hiển thị thông báo thành công
                onClose(); // Đóng popup sau khi cập nhật thành công
            } else {
                // Nếu phản hồi từ server không phải là thành công
                setError("Cập nhật thất bại! Vui lòng thử lại.");
            }
        } catch (err) {
            console.error('Error:', err); // Log lỗi client
            setError("Cập nhật thất bại! Vui lòng thử lại.");
        } finally {
            // Đảm bảo popup sẽ chỉ đóng sau khi đã xử lý xong mọi thứ
            if (!error && !loading) {
                onClose();
            }
        }
    };



    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Chỉnh sửa khóa học</h2>

                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>} {/* Hiển thị thông báo thành công */}

                <div className="mb-4">
                    <label className="block text-gray-700">Tên khóa học</label>
                    <input
                        type="text"
                        name="name"
                        value={editedCourse.name}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Video ID</label>
                    <input
                        type="text"
                        name="videoId"
                        value={editedCourse.videoId}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Cấp độ</label>
                    <input
                        type="text"
                        name="level"
                        value={editedCourse.level}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div className="flex justify-end space-x-2">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">
                        Hủy
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                        disabled={loading}
                    >
                        {loading ? "Đang lưu..." : "Lưu"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PopupEdit;
