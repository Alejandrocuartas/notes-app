import React, { useState } from 'react';
import Tag from './Tag';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import NoteForm from './UpdateNoteForm';

const Note = ({ note, refreshCallback }: { note: Note, refreshCallback: (setLoading: boolean) => void }) => {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);

    const renderedTags = note?.tags?.length > 2 ? note.tags.slice(0, 2) : note.tags;

    const tagsContent = note?.tags?.length > 2 ? (
        <>
            {renderedTags.map((tag, index) => (
                <Tag key={tag.id} tag={tag} />
            ))}
            <span className="text-gray-500">+{note.tags.length - 2}</span>
        </>
    ) : (
        renderedTags.map((tag) => (
            <Tag key={tag.id} tag={tag} />
        ))
    );

    const onCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <article
                key={note.id}
                onClick={() => setModalOpen(true)}
                className={`
                    flex w-100% md:w-1/2 lg:w-1/4 flex-col 
                    items-start justify-between ml-2 mr-2 
                    mt-4 mb-4 bg-white shadow-lg rounded-lg 
                    p-4 cursor-pointer hover:bg-gray-100
                `}
            >
                <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={note.created_at.split("T")[0]} className="text-gray-500">
                        {note.created_at.split("T")[0]}
                    </time>
                    {tagsContent}
                </div>
                <div className="group relative">
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 break-all">{note.notes}</p>
                </div>
            </article>
            <Modal isOpen={modalOpen} onClose={onCloseModal}>
                <NoteForm note={note} refreshCallback={refreshCallback} onClose={onCloseModal} />
            </Modal>
        </>
    )
}

export default Note;
