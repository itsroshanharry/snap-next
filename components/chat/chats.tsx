import { auth } from "@/auth"
import { getUsersForSidebar } from "@/lib/data";
import Chat from "./chat";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const Chats = async () => {
    const session = await auth();
    await sleep(3000);
    const chats = session?.user ? await getUsersForSidebar(session.user._id) : [];
    console.log(chats);
  return (
    <nav className="flex-1 overflow-y-auto">
     <ul> 
        {
            chats.map( chat => (
                <Chat key={chat._id} chat = {chat} />
            ))
        }
     </ul>
    </nav>
  )
}

export default Chats