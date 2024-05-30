import React, { useState } from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { createTagRequest } from '../requests/create_tag'
import EmojiPicker from 'emoji-picker-react';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const Select = ({ tags, defaultCTA, callback, isForANote, noteId }: { tags: Tag[], defaultCTA: string, callback: (tag: Tag) => void, isForANote?: boolean, noteId?: number }) => {
    const [selected, setSelected] = useState<Tag>({ tag: defaultCTA, emoji: '🏷️' })
    const [isCreatingTag, setIsCreatingTag] = useState(false);
    const [isSelectingEmoji, setIsSelectingEmoji] = useState(false);
    const [newTag, setNewTag] = useState<Tag>({ tag: "Productivity", emoji: "💥" });


    const handleChange = (tag: Tag) => {
        setSelected(tag);
        callback(tag);
    }

    const handleCreateTag = async () => {
        if (!noteId) return;
        try {
            setIsCreatingTag(false);
            const tag = await createTagRequest(newTag.tag, newTag.emoji, noteId);
            tag ? setSelected({ tag: tag.tag, emoji: tag.emoji, id: tag.id }) : null;
            tag ? callback(tag) : null;

        } catch (error: any) {
            console.log(error);
            setIsCreatingTag(false);
            alert("There was an error while saving the tag. Please try again.");
        }
    }

    const handleCreateTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTag({ tag: e.target.value, emoji: newTag.emoji });
    }

    const handleEmojiChange = (e: any) => {
        setNewTag({ tag: newTag.tag, emoji: e.emoji });
        setIsSelectingEmoji(false);
    }

    if (isSelectingEmoji) {
        return (
            <div className='z-10 fixed top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-50 flex justify-center items-center'>
                <EmojiPicker open={isSelectingEmoji} height={400} width={300} onEmojiClick={handleEmojiChange} />
            </div>
        )
    }

    if (isCreatingTag) {
        return (
            <>
                <div className="flex justify-center items-center bg-orange-400 rounded-lg border-0">
                    <div onClick={() => setIsSelectingEmoji(true)} className="cursor-pointer ml-1">
                        {newTag.emoji}
                    </div>
                    <input defaultValue={newTag.tag} maxLength={25} type="text" placeholder="tag name" className="focus:outline-none w-full p-2 text-sm text-gray-900 bg-orange-400 rounded-lg border-0 focus:ring-0 focus:border-0 border-b-2 border-orange-500" onChange={handleCreateTagChange} />
                    <button onClick={handleCreateTag} className="bg-gray-200 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-fullbg-transparent text-gray-700 hover:text-white py-2 px-4 border hover:border-transparent rounded" >
                        Create
                    </button>
                </div>
            </>
        )
    }

    return (
        <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
                <>
                    <div className="relative mt-2">
                        <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                            <span className="flex items-center">
                                {selected.emoji}
                                <span className="ml-3 block truncate">{selected.tag}</span>
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </ListboxButton>

                        <Transition show={open} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                            <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {tags?.map((tag) => (
                                    <ListboxOption
                                        onClick={() => handleChange(tag)}
                                        key={tag.id}
                                        className={({ focus }) =>
                                            classNames(
                                                focus ? 'bg-indigo-600 text-white' : '',
                                                !focus ? 'text-gray-900' : '',
                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                            )
                                        }
                                        value={tag}
                                    >
                                        {({ selected, focus }) => (
                                            <>
                                                <div className="flex items-center">
                                                    {tag.emoji}
                                                    <span
                                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                    >
                                                        {tag.tag}
                                                    </span>
                                                </div>

                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            focus ? 'text-white' : 'text-indigo-600',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                        )}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </ListboxOption>
                                ))}
                                {isForANote ? (
                                    <ListboxOption
                                        key={0}
                                        className={({ focus }) =>
                                            classNames(
                                                focus ? 'bg-indigo-600 text-white' : '',
                                                !focus ? 'text-gray-900' : '',
                                                'relative cursor-default select-none py-2 pl-3 pr-9 p-0'
                                            )
                                        }
                                        value={{ tag: "", emoji: "🏷️" }}
                                    >
                                        <button className='w-full p-0' onClick={() => setIsCreatingTag(true)}>
                                            Create a tag
                                        </button>
                                    </ListboxOption>
                                ) : null}
                            </ListboxOptions>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    )
}

export default Select;
