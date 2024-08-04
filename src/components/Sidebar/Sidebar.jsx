import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context';
const Sidebar = () => {

    const [extended, setextended] = useState(false);
    const { onSent, previousPrompt, setrecentPrompt, newChat } = useContext(Context)

    const loadPrompt = async (prompt) => {
        setrecentPrompt(prompt)
        await onSent(prompt)
    }
    return (
        <div className='sidebar'>
            <div className='top'>
                <img className='menu' src={assets.menu_icon} alt='' onClick={() => {
                    extended ? setextended(false) : setextended(true)
                }} />
                {/* can also be set to be setextended(prev => !prev) */}

                <div onClick={() => newChat()} className='new-chat'>
                    <img src={assets.plus_icon} alt='' />
                    {extended && <p> New Chat</p>}
                </div>
                {extended &&
                    <div className='recent'>
                        <p className='recent-title'>Recent</p>
                        {previousPrompt.map((item, idx) => (
                            <div key={idx} onClick={() => loadPrompt(item)} className='recent-entry'>
                                <img src={assets.message_icon} alt='' />
                                <p>{item.slice(0, 18)} ....</p>
                            </div>
                        ))}
                    </div>
                }
            </div>
            <div className='bottom'>
                <div className='bottom-item recent-entry'>
                    <img src={assets.question_icon} alt='' />
                    {extended && <p>Help</p>}
                </div>
                <div className='bottom-item recent-entry'>
                    <img src={assets.history_icon} alt='' />
                    {extended && <p>Activity</p>}
                </div>
                <div className='bottom-item recent-entry'>
                    <img src={assets.setting_icon} alt='' />
                    {extended && <p>Settings</p>}
                </div>
            </div>
        </div>
    )
}

export default Sidebar