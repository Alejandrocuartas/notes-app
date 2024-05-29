import * as React from 'react';

const Tag = ({ tag }: { tag: Tag }) => {
    return (
        <>
            <div
                className="relative rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600"
            >
                {tag.emoji} {tag.tag}
            </div>
        </>
    )
}

export default Tag;
