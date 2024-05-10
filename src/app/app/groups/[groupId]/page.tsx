

/**
 * Group page
 * 
 * @param param0 
 * @returns 
 */
export default function GroupPage({
    params: {
        groupId,
    }
}: {
    params: {
        groupId: number,
    }
}) {
    
    return (
        <div>
            <h1>Group id: {groupId}</h1>
        </div>
    );
}
