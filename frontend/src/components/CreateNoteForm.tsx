import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import { useGlobalState } from "../context";
import { createNoteRequest } from "../requests/create_note";

const CreateNoteForm = ({ onClose }: { onClose: () => void }) => {
    const [loading, setLoading] = React.useState(false)
    const globalState = useGlobalState()
    const [notes, setNotes] = useState('');


    const handleChange = async (e: any) => {
        setNotes(e.target.value);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!globalState?.id) {
            return
        }
        try {
            setLoading(true);
            await createNoteRequest(notes, globalState?.id);
            setLoading(false);
            onClose();
        } catch (error: any) {
            setLoading(false);
            console.log(error);
            alert("Error creating note. Please try again.");
        }
    }

    useEffect(() => {
        return () => {
            globalState?.setUser({ ...globalState, refetch: !globalState?.refetch });
        }
    }, [])

    return (
        <div className='bg-white rounded-lg p-4'>


            <div className='flex justify-between mb-2 items-center'>
                <h2 className="text-xl font-extrabold mb-4">Create A Note</h2>

                <div>
                    {
                        loading
                            ? <Loading width={6} height={6} />
                            : null
                    }
                </div>
            </div>

            <form className="max-w-sm mx-auto mt-2">
                <textarea
                    id="message"
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-orange-400 rounded-lg border-0 focus:ring-0 focus:border-0 border-b-2 border-orange-500"
                    placeholder="Leave a note..."
                    onChange={handleChange}
                >
                </textarea>
                <div className="flex justify-center">
                    <button onClick={handleSubmit} className="mt-2 bg-gray-300 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-fullbg-transparent text-gray-700 hover:text-white py-2 px-4 border hover:border-transparent rounded" >
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateNoteForm;
