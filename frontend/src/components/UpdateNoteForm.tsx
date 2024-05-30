import React, { useEffect, useState } from 'react';
import { updateNoteRequest } from '../requests/update_note';
import Select from './Select';
import { getTagsRequest } from '../requests/get_tags';
import { addTagToNoteRequest } from '../requests/add_tag_to_note';
import Tag from './Tag';
import { deleteNoteRequest } from '../requests/delete_note';
import Loading from './Loading';

const NoteForm = ({ note, refreshCallback, onClose }: { note: Note, refreshCallback: (setLoading: boolean) => void, onClose: () => void }) => {
    const [notes, setNotes] = useState(note.notes);
    const [isArchived, setIsArchived] = useState(note.is_archived);
    const [loading, setLoading] = useState(false);
    const [tags, setTags] = useState<Tag[]>([]);
    const [noteTags, setNoteTags] = useState<Tag[]>(note.tags);

    const handleArchive = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsArchived(e.target.checked);
        try {
            setLoading(true);
            await updateNoteRequest(note.id, notes, e.target.checked);
            setLoading(false);
            refreshCallback ? refreshCallback(false) : null;
        } catch (error: any) {
            setLoading(false);
            console.log(error);
            alert("There was an error while saving your note. Please try again.");
        }
    };

    const handleTagChange = async (tag: Tag) => {
        try {
            setLoading(true);
            tag.id ? await addTagToNoteRequest(tag.id, note.id) : null;
            setNoteTags([...noteTags, tag]);
            setLoading(false);
            refreshCallback ? refreshCallback(false) : null;
        } catch (error: any) {
            setLoading(false);
            console.log(error);
            alert("There was an error while saving the tag. Please try again.");
        }
    }

    const handleChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNotes(e.target.value);
        try {
            setLoading(true);
            await updateNoteRequest(note.id, e.target.value, isArchived);
            setLoading(false);
            refreshCallback ? refreshCallback(false) : null;
        } catch (error: any) {
            setLoading(false);
            console.log(error);
            alert("There was an error while saving your note. Please try again.");
        }
    };

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            setLoading(true);
            await deleteNoteRequest(note.id);
            setLoading(false);
            refreshCallback ? refreshCallback(false) : null;
            onClose();
        } catch (error: any) {
            setLoading(false);
            console.log(error);
            alert("There was an error while deleting your note. Please try again.");
        }
    };

    useEffect(() => {
        getTagsRequest().then((tags) => {
            tags ? setTags(tags) : null;
        });
    }, []);


    return (
        <div className='bg-white rounded-lg p-4'>

            {
                noteTags.length > 0 ?
                    <div className='flex flex-wrap gap-2 mb-2'>
                        {noteTags.map((tag) => <Tag key={tag.id} tag={tag}></Tag>)}
                    </div>
                    : null
            }

            <h2 className="text-xl font-extrabold mb-4">Your Note Will Be Saved Automatically</h2>

            <div className='flex justify-between mb-2'>
                <label className="inline-flex items-center me-5 cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" checked={isArchived} onChange={handleArchive} />
                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-400">Archive</span>
                </label>

                {
                    loading ?
                        <Loading width={6} height={6} />
                        :
                        <button onClick={handleDelete}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </button>
                }

            </div>

            <Select noteId={note.id} isForANote={true} callback={handleTagChange} defaultCTA='Add a tag' tags={tags}></Select>

            <form className="max-w-sm mx-auto mt-2">
                <textarea
                    id="message"
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-orange-400 rounded-lg border-0 focus:ring-0 focus:border-0 border-b-2 border-orange-500"
                    placeholder="Leave a comment..."
                    onChange={handleChange}
                    defaultValue={note.notes}
                >
                </textarea>
            </form>
        </div>
    );
};

export default NoteForm;