import React, { useEffect } from 'react';
import Loading from './Loading';
import { useGlobalState } from "../context";
import { createNoteRequest } from "../requests/create_note";

const CreateNoteForm = () => {
    const [loading, setLoading] = React.useState(false)
    const globalState = useGlobalState()


    const handleChange = async (e: any) => {
        if (!globalState?.id) {
            return
        }

        const notes = e.target.value;
        try {
            setLoading(true);
            await createNoteRequest(notes, globalState?.id);
            setLoading(false);
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
                <h2 className="text-xl font-extrabold mb-4">Your Note Will Be Saved Automatically</h2>

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
            </form>
        </div>
    );
};

export default CreateNoteForm;
