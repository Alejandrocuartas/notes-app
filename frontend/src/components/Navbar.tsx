import React, { useEffect, useState } from "react";
import { useGlobalState } from "../context";
import Dropdown from "./Dropdown";
import { getTagsRequest } from "../requests/get_tags";
import Select from "./Select";
import Modal from "./Modal";
import CreateNoteForm from "./CreateNoteForm";
import { useLocation } from "react-router-dom";

const Navbar = () => {
    const locationHook = useLocation()
    const globalState = useGlobalState()
    const [tags, setTags] = useState<Tag[]>([]);
    const [modalOpen, setModalOpen] = useState(false);

    const onCloseModal = () => {
        setModalOpen(false);
    };

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
        <>
            <nav className="bg-white shadow-md p-4 flex justify-between items-center">
                <Dropdown createNote={() => setModalOpen(true)} user_name={globalState?.name ?? ""} logOut={logOut} />
                {!locationHook.pathname.includes("archive") ? null : (
                    <span className="text-red-500 text-sm semibold">On Archive You Can´t Create New Notes</span>
                )}
                <div className="flex items-center gap-x-4">
                    <button onClick={() => location.reload()}>clear filter</button>
                    <Select callback={handleTagFilter} defaultCTA='Query by tag' tags={tags}></Select>
                </div>
            </nav>
            <Modal isOpen={modalOpen} onClose={onCloseModal}>
                <CreateNoteForm></CreateNoteForm>
            </Modal>
        </>
    )
}

export default Navbar
