interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}

export const BlogCard = ({ authorName, title, content, publishedDate }: BlogCardProps) => {
    return <div className="border-b-2 border-slate-400 p-2">
        <div className="flex ">
            <div className="flex justify-center flex-col">
                <Avatar name={authorName} />
            </div>
            <div className="font-extralight pt-2">
                {authorName || "Anonymous"}
            </div>
            <div className="pt-2 font-thin text-slate-500">
                {publishedDate}
            </div>
        </div>
        <div className="text-xl font-semibold">
            {title}
        </div>
        <div className="text-md font-thin">
            {content.slice(0, 100) + "..."}
        </div>
        <div className="text-slate-500 text-sm font-thin">
            {
                `${Math.ceil(content.length / 100)} minutes`
            }
        </div>
    </div>
}

export function Avatar({ name }: { name: string }) {
    return <div className="relative inline-flex items-center justify-center h-6 w-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <span className="text-slate-200 text-base">{name[0]}</span>
    </div>
}