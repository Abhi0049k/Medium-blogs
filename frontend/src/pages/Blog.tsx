import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks";

export const Blog = () => {
    const { loading, blogs } = useBlogs();
    console.log(loading, blogs);
    if (loading) {
        return <div>Loading....</div>
    }
    return (
        <div>
            <Appbar />
            <div className="flex justify-center border">
                <div className="max-w-xl">
                    {/* {
                        blogs.map(blog=>{
                            <BlogCard authorName={blog.author.name}
                            title={blog.title} content={blog} publishedDate="2nd Feb, 2024"/>
                        })
                    } */}
                    <BlogCard authorName="Mangalam" title="How an ugly single page website makes $5000 a month without affiliate marketing" content="How an ugly single page website makes $5000 a month without affiliate marketing. How an ugly single page website makes $5000 a month without affiliate marketing" publishedDate="2nd Feb, 2024" />
                    <BlogCard authorName="Mangalam" title="How an ugly single page website makes $5000 a month without affiliate marketing" content="How an ugly single page website makes $5000 a month without affiliate marketing. How an ugly single page website makes $5000 a month without affiliate marketing" publishedDate="2nd Feb, 2024" />
                    <BlogCard authorName="Mangalam" title="How an ugly single page website makes $5000 a month without affiliate marketing" content="How an ugly single page website makes $5000 a month without affiliate marketing. How an ugly single page website makes $5000 a month without affiliate marketing" publishedDate="2nd Feb, 2024" />
                    <BlogCard authorName="Mangalam" title="How an ugly single page website makes $5000 a month without affiliate marketing" content="How an ugly single page website makes $5000 a month without affiliate marketing. How an ugly single page website makes $5000 a month without affiliate marketing" publishedDate="2nd Feb, 2024" />
                </div>
            </div>
        </div>
    );
}

