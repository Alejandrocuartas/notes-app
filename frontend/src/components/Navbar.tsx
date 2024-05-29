import React, { useEffect, useState } from "react";
import { useGlobalState } from "../context";
import Dropdown from "./Dropdown";
import { getTagsRequest } from "../requests/get_tags";
import Select from "./Select";

const Navbar = () => {
    const globalState = useGlobalState()
    const [tags, setTags] = useState<Tag[]>([]);

    const logOut = () => {
        localStorage.removeItem("notes_app_user");
        window.location.href = "/login";
    }

    const handleTagFilter = (tag: Tag) => {
        globalState?.setUser({ ...globalState, tag_id: tag.id });
    }

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const res = await getTagsRequest();
                res ? setTags(res) : null;
            } catch (error: any) {
                console.log(error);
                alert(error.message);
            }
        };

        fetchTags();
    }, [])

    if (!globalState?.name) {
        return null
    }

    return (
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
            <Dropdown user_name={globalState?.name ?? ""} logOut={logOut} />
            <Select callback={handleTagFilter} defaultCTA='Query by tag' tags={tags}></Select>
        </nav>
    )
}

export default Navbar
