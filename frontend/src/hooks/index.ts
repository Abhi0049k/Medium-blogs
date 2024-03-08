import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

interface Blog {
    content: string;
    title: string;
    id: number;
    author: {
        name: string;
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/all`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then((res) => {
                setBlogs(res.data);
                setLoading(false);
            })
    }, [])
    return {
        loading, blogs
    }
}