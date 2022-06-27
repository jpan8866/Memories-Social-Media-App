import { ChatEngine } from 'react-chat-engine';
import CustomChatFeed from './CustomChatFeed';

import './ChatApp.css';

const ChatApp = () => {
    return (
        <ChatEngine
            height="100vh"
            projectID="54b97149-8d48-4f08-93b5-b2ee5a3fb3a4"
            userName="yellowysynapse"
            userSecret="123123"
            renderChatFeed={(chatAppProps) => <CustomChatFeed { ...chatAppProps} />}
        />
    )
}

export default ChatApp