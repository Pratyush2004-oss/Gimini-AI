import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {

    const data = [
        {
            data: "Suggest beautiful places to see on an upcoming road trip",
            img: assets.compass_icon
        },
        {
            data: "Briefly summarize this concept: Urban planning",
            img: assets.bulb_icon
        },
        {
            data: "Vrainstrom team bonding activities for our work retreat",
            img: assets.message_icon
        },
        {
            data: "Improve the readibility of the following code.",
            img: assets.code_icon
        },
    ]

    const { onSent, recentPrompt, showresult, loading, resultdata, setInput, input } = useContext(Context)
    return (
        <div className='main'>
            <div className='nav'>
                <a href='/'>Gimini</a>
                <img src={assets.user_icon} alt='' />
            </div>
            <div className='main-container'>
                {
                    !showresult ?
                        <div>
                            <div className='greet'>
                                <p><span>Hello, Explorer.</span></p>
                                <p>How can I help you today?</p>
                            </div>
                            <div className='cards'>
                                {data.map((item, idx) => (
                                    <div onClick={() => setInput(item.data)} key={idx} className='card'>
                                        <p>{item.data}</p>
                                        <img src={item.img} alt='' />
                                    </div>
                                ))}
                            </div>
                        </div>
                        :
                        <div className='result'>
                            <div className='result-title'>
                                <img src={assets.user_icon} alt='' />
                                <p>{recentPrompt}</p>
                            </div>
                            <div className='result-data'>
                                <img src={assets.gemini_icon} alt='' />
                                {loading ?
                                    <div className='loader'>
                                        <hr />
                                        <hr />
                                        <hr />
                                    </div>
                                    :
                                    (resultdata !== undefined) &&
                                    <p dangerouslySetInnerHTML={{ __html: resultdata }}></p>
                                }
                            </div>

                        </div>

                }

                <div className='main-bottom'>
                    <div className='search-box'>
                        <input onChange={(e) => setInput(e.target.value)} value={input} type='text' placeholder='Enter a prompt here' />
                        <div className='search-box-item'>
                            <img src={assets.gallery_icon} alt='' />
                            <img src={assets.mic_icon} alt='' />
                            {input &&
                                <img onClick={() => onSent()} src={assets.send_icon} alt='' />
                            }
                        </div>
                    </div>
                    <p className='bottom-info'>Gimini may display inaccurate info, including about people, so double check its responses. Your privacy and Gimini Apps</p>
                </div>
            </div>

        </div>
    )
}

export default Main