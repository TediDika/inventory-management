import { Link } from "@inertiajs/react";

export default function Pagination({ links }){

    return (
        <nav className="text-center mt-4">
            {links.map((link) => (
                <Link
                preserveScroll
                href={link.url || ""}
                key={link.label}
                className={"inline-block px-3 py-2 text-white" + (link.active ? "bg-red-400 " : " ") +
                    (!link.url ? "!text-gray-400 cursor-not-allowed ": "hover:bg-blue-500 rounded-lg")
                }
                dangerouslySetInnerHTML={{__html: link.label }}></Link>
            ))}
        </nav>


    )
}