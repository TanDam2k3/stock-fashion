import React, { useEffect, useState } from "react";
import axios from "axios";

interface ICourse {
    _id: string;
    name: string;
    image: string;
    description: string;
    videoId: string;
    level: string;
}

const CourseList: React.FC = () => {
    const [courses, setCourses] = useState<ICourse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get("http://localhost:3001/courses")
            .then(response => {
                setCourses(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError("Không thể tải dữ liệu!");
                setLoading(false);
                console.error("Lỗi khi lấy danh sách khóa học:", error);
            });
    }, []);

    if (loading) return <p className="text-center text-lg text-gray-600">Đang tải dữ liệu...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Danh Sách Khóa Học</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map(course => (
                    <div key={course._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                        <img src={course.image} alt={course.name} className="w-full h-40 object-cover rounded-lg mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
                        <p className="text-gray-700 text-sm mb-2">{course.description}</p>
                        <a
                            href={`https://www.youtube.com/watch?v=${course.videoId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            Xem Video
                        </a>
                        <p className="text-gray-500 text-sm mt-2">Cấp độ: {course.level}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseList;
